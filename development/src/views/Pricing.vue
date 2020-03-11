<template>
	<div style="min-height: 150vh">
		<comp-header
			:background-image="require('../assets/images/topbanneredit.png')"
			background-colour="#5B7D87"
			title="Pricing"
		/>
		<v-container>
			<v-row>
				<v-col cols="12">
					<v-card flat style="max-width: 910px; margin: 0 auto">
						<h2 class="glacial text-uppercase">Freelance Design Hourly Rates</h2>

						<kinesis-image-grid
							:src="require('../assets/images/wavesgrid.png')"
							gap="10px"
							:options="{cols: 2, rows: 2}"
							:dimensions="gridDimensions"
						>
							<template v-slot:overlay1>
								<div class="grid-centre-cell glacial">£65</div>
							</template>
							<template v-slot:overlay2>
								<div
									class="grid-description-cell glacial"
								>Design service with no copy writing and no significant copy editing. Includes two rounds of simple revision* free of charge.</div>
							</template>
							<template v-slot:overlay3>
								<div class="grid-centre-cell">£85</div>
							</template>
							<template v-slot:overlay4>
								<div class="grid-description-cell glacial">
									<p>
										Design service
										<em>with</em> copy writing**. Includes two rounds of simple revision* free of charge.
									</p>
								</div>
							</template>
						</kinesis-image-grid>

						<v-card-text
							class="px-0"
						>* Simple revisions are defined as minor edits. What constitutes a minor versus a major edit is based on time investment necessary to the make the change. Major changes to copy or design are subject to further charges. Client will be provided an estimate of all charges and asked to approve those charges before work is completed on any major revision.</v-card-text>

						<v-card-text class="px-0">
							** For writing samples, please
							<underlink color="#5B7D87">
								<router-link to="/contact">contact me</router-link>
							</underlink>with a description of the project your are considering and the scope of the copy writing.
						</v-card-text>
					</v-card>

					<v-card flat style="max-width: 910px; margin: 0 auto" class="mt-8">
						<h2 class="glacial text-uppercase">CV + Personal Brand Services</h2>

						<kinesis-image-grid
							:src="require('../assets/images/wavesgrid.png')"
							gap="10px"
							:options="{cols: 3, rows: 2, width: 300, height: 300}"
						>
							<template v-slot:overlay1>
								<div class="grid-spaced glacial-bold">
									<div>CV</div>
									<div>£ 75</div>
								</div>
							</template>
							<template v-slot:overlay2>
								<div class="grid-spaced glacial-bold">
									<div>
										CV +
										<br />Letterhead
									</div>
									<div>£ 100</div>
								</div>
							</template>
							<template v-slot:overlay3>
								<div class="grid-spaced glacial-bold">
									<div>
										CV +
										<br />Letterhead +
										<br />Business Card
									</div>
									<div>£ 125</div>
								</div>
							</template>
							<template v-slot:overlay4>
								<div class="grid-spaced glacial-bold">
									<div>Add Simple Logo</div>
									<div>+ £25</div>
								</div>
							</template>
							<template v-slot:overlay5>
								<div class="grid-spaced glacial-bold">
									<div>Personal Brand Package</div>
									<div>£ 295</div>
								</div>
							</template>
							<template v-slot:overlay6>
								<div class="grid-spaced glacial-bold">
									<div>Questions?</div>
									<div>
										<underlink>Contact us</underlink>
									</div>
								</div>
							</template>
						</kinesis-image-grid>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container>
			<v-row>
				<v-col cols="12">
					<v-card flat style="max-width: 910px; margin: 0 auto" class="glacial">
						<h2 class="glacial text-uppercase">The Details</h2>
						<ul>
							<li>All CV packages, aside from the Personal Brand Package, require the client to provide a current CV and relevant details via a questionnaire which will be sent by email within 24 hours of purchasing a CV package.</li>
							<li>Most purchaser will receive initial proofs of their designs within seven business days of filling out the questionnaire. More complex CVs may take longer or require more follow-up information via email.</li>
							<li>No CV packages, aside from the Personal Brand Package, include significant copy writing. The designer may make minor edits to copy provided in current CV to assist in its design, but will not re-write the entire CV.</li>
							<li>All packages include two rounds of revision at no additional charge. Revisions include minor changes to text and design. Major changes to copy or design are subject to further charges. Client will be provided with an estimate of all charges and asked to approve those charges before work is completed on any major revision.</li>
						</ul>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container>
			<v-row>
				<v-col cols="12">
					<v-card flat style="max-width: 910px; margin: 0 auto" class="glacial">
						<h2 class="glacial text-uppercase">Examples</h2>

						<kinesis-image-grid
							:src="require('../assets/images/wavesgrid.png')"
							gap="20px"
							:options="{cols: 3, rows: 1, width: 290, height: 100}"
						>
							<template v-slot:overlay1>
								<div class="grid-centre-cell" style="font-size:1.6em;">CV</div>
							</template>
							<template v-slot:overlay2>
								<div class="grid-centre-cell" style="font-size:1.6em;">CV + Logo</div>
							</template>
							<template v-slot:overlay3>
								<div class="grid-centre-cell" style="font-size:1.6em;">Full Brand</div>
							</template>
						</kinesis-image-grid>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container>
			<v-row>
				<v-col cols="12">
					<v-card flat style="max-width: 910px; margin: 0 auto;">
						<h2 class="glacial text-uppercase">The Full Brand Package</h2>

						<kinesis-image-grid
							:src="require('../assets/images/wavesgrid.png')"
							gap="20px"
							:options="{cols:2,rows:1, width: 450, height: 200}"
						>
							<template v-slot:overlay1>
								<div style="font-size:1.2em;">
									<div>
										CV
										<br />Logo
										<br />Letterhead
										<br />Consultation
										<br />Business Card
										<br />Writing Service
									</div>
								</div>
							</template>
							<template v-slot:overlay2>
								<div
									class="d.flex flex-column justify-start align-center"
									style="font-size:1.2em;"
								>The Full Brand Package is a full service bespoke branding and design experience. Includes phone consultation of up to 30 minutes as well as full CV writing service and all associated products.</div>
							</template>
						</kinesis-image-grid>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container>
			<v-row>
				<v-col cols="12">
					<v-card flat style="max-width: 910px; margin: 0 auto" class="glacial">
						<ul>
							<li>Due to the intensive nature of the personal brand package, first proofs can take up to fourteen business days to deliver from the date of the initial consultation.</li>
							<li>Package includes two rounds of revision at no additional charge.</li>
							<li>Interview preperation and cover letter writing services are available at an additional charge. Please contact for more information about these services.</li>
						</ul>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import KinesisImageGrid from "../../../../lib/vue/components/ImageGrid.vue";

export default {
	components: {
		KinesisImageGrid
	},
	data() {
		return {
			gridDimensions: [
				{ width: 300, height: 150 },
				{ width: 600, height: 150 }
			]
		};
	}
};
</script>

<style scoped>
.grid-centre-cell {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2em;
}

.grid-description-cell {
	font-size: 1.2em;
}

.grid-spaced {
	font-size: 1.2em;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
}
</style>