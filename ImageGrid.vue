<!--
	SLOTS: accepts slots with title "overlay" followed by a number. Exposes img variable
	PROPS: 
        hover-effect: String,
		options: {
			cols: number of image pieces per column
			rows: number of image pieces per row
			width: pixel width of the image pieces
			height: pixel height of the image pieces
		}
		xs-options, sm-options, md-options, lg-options, xl-options: override based on screen size,
		gap: pixel gap between image pieces
		src: image object to use for grid
		resize: resize image to use whole width or height
		gridDimensions: [
			Array of objects containing piece dimensions for each
			{
				width: pixel width of piece,
				height: pixel height of piece
			}
		]
-->
<template>
	<div class="grid-container" 
		:style="{ 
			gridGap: gap, 
			gridTemplateColumns: gridColumns,
			gridTemplateRows: gridRows
		}"
	>
		<div class="grid-item" 
			v-for="(piece, idx) in imagePieces"
			:key="idx"
            :class="{ 'hover-effect': hover }"
		>
			<img :src="piece.src" />
			<div class="grid-item-overlay">
				<slot :name="slots[idx]" :piece="piece.src"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "kinesis-image-grid",
	data() {
		return {
			image: null,
			imageWidth: null,
			imageHeight: null,
			imageAspect: null,
			piece: {
				width: null,
				height: null
			},
			imagePieces: [],
			activeOptions: {}
		}
	},
	computed: {
		slots() {
			return Object.keys(this.$scopedSlots).filter(x => {
				return /^overlay/i.test(x) === true;
			})
		},
		gridColumns() {
			if (this.dimensions && this.dimensions[0]) return this.dimensions.map(item => item.width + "px").join(" ");
			else return new Array(this.activeOptions.cols + 1).join(` ${this.piece.width}px `);
		},
		gridRows() {
			if (this.dimensions && this.dimensions[0]) return new Array(this.activeOptions.rows + 1).join(` ${this.dimensions[0].height}px `)
			return new Array(this.activeOptions.rows + 1).join(` ${this.piece.height}px `)
		}
	},
	props: {
		src: {
			type: String,
			required: true
		},
		gap: {
			type: String,
			default: "10px"
		},
		resize: {
			type: Boolean,
			default: false
		},
		dimensions: {
			type: Array,
			default: () => {
				return []
			}
        },
        hover: {
            type: Boolean,
            default: false
        },
		xsOptions: Object,
		smOptions: Object,
		mdOptions: Object,
		lgOptions: Object,
		xlOptions: Object,
		options: Object
	},
	created() {
		this.setOptions();
		this.image = new Image();
		this.image.onload = this.processImage;
		this.image.src = this.src;
		window.addEventListener('resize', this.windowResized);
	},
	methods: {
		windowResized() {
			this.setOptions();
			this.image = new Image();
			this.image.onload = this.processImage;
			this.image.src = this.src;
		},
		setOptions() {
			// Assign options based on screen size
			if (window.screen.width >= 1904 && this.xlOptions) this.activeOptions = this.xlOptions;
			else if (window.screen.width >= 1264 && window.screen.width < 1904 && this.lgOptions) this.activeOptions = this.lgOptions;
			else if (window.screen.width >= 960 && window.screen.width < 1264 && this.mdOptions) this.activeOptions = this.mdOptions;
			else if (window.screen.width >= 600 && window.screen.width < 960 && this.smOptions) this.activeOptions = this.smOptions;
			else if (window.screen.width < 600 && this.xsOptions) this.activeOptions = this.xsOptions;
			else this.activeOptions = this.options;
		},
		processImage() {
			this.image.onload = undefined;

			this.imageWidth = this.image.width;
			this.imageHeight = this.image.height;

			this.calculateSize();
		},
		calculateSize() {
			this.imageAspect = this.imageWidth / this.imageHeight;

			// If no piece sizes are defined, divide dimensions by no. of rows/columns
			this.piece.width = !this.activeOptions.width ? this.imageWidth / this.cols : this.activeOptions.width;
			this.piece.height = !this.activeOptions.height ? this.imageHeight / this.rows : this.activeOptions.height;

			// If user has selected "resize", create a new image whose dimensions fit to the total size of rows and columns to display
			if (this.resize === true && this.activeOptions.width && this.activeOptions.height) {
				let w, h;
				const setByHeight = () => {
					h = (this.imageHeight > this.piece.height * this.activeOptions.rows) ? this.piece.height * this.activeOptions.rows : this.imageHeight;
					w = Math.floor(h * this.imageAspect);
				}
				const setByWidth = () => {
					w = (this.imageWidth > this.piece.width * this.activeOptions.cols) ? this.piece.width * this.activeOptions.cols : this.imageWidth;
					if (w / this.imageAspect < this.piece.height * this.activeOptions.rows) setByHeight();
					else h = Math.floor(w / this.imageAspect);
				}
				setByWidth();
				this.resizeImage({w,h});
			}
			else this.createGrid();
		},
		resizeImage({w: newWidth, h: newHeight}) {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			
			canvas.height = newHeight;
			canvas.width = newWidth;

			ctx.drawImage(this.image, 0, 0, newWidth, newHeight);
			this.image.onload = this.createGrid;
			this.image.src = canvas.toDataURL();
			this.imageWidth = newWidth;
			this.imageHeight = newHeight;
		},
		createGrid() {
			const manualClip = ({obj,columnNumber}) => {
				let total = 0;
				for (let i = 0; i < columnNumber; i++) {
					total += obj[i].width;
				}
				return total;
			}
			this.image.onload = undefined;
			this.imagePieces = [];
			for (let r = 0; r < this.activeOptions.rows; r++) {
				for (let c = 0; c < this.activeOptions.cols; c++) {
					let w, h, clipX, clipY;
					const canvas = document.createElement('canvas');
					canvas.width = w = this.dimensions[c] ? this.dimensions[c].width : this.piece.width;
					canvas.height = h = this.dimensions[c] ? this.dimensions[c].height : this.piece.height;
					const context = canvas.getContext('2d');

					clipX = (this.dimensions && this.dimensions[0]) ? manualClip({obj: this.dimensions,columnNumber: c}) : c * w;
					clipY = r * h;

					context.drawImage(
						this.image, // Element to draw
						clipX, // x coordinate from where to start clipping
						clipY, // y coordinate from where to start clipping
							w, // width of the clipped image
							h, // height of the clipped image
							0, // x coordinate where to place the image on the canvas
							0,  // y coordinnate where to place the image on the canvas
							canvas.width, // width of the image to use
							canvas.height // height of the image to use
						)
					this.imagePieces.push({src: canvas.toDataURL()});
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.grid-container {
		display: grid;
		justify-content: center;
	}

	.grid-item {
		position: relative;

        img {
            transition: filter 300ms ease-in-out;
        }

        &.hover-effect:hover img {
            filter: grayscale(100%);
        }
	}

	.grid-item-overlay {
		position: absolute;
		top: 0; left: 0; right: 0; bottom: 0;
		color: white;
		padding: 0.5em 1em;

		> div {
			height: 100%;
			width: 100%;
			display: flex;
			color: inherit;
			text-decoration: none;
		}
	}
</style>
