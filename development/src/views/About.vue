<template>
	<div style="min-height: 80vh">
		<comp-header
			:background-image="require('../assets/images/topbanneredit.png')"
			background-colour="#5B7D87"
			title="About Me"
		/>
		<v-container style="max-width: 1185px" class="mt-8">
			<v-card flat>
				<v-card-text>
					<v-row>
						<v-col cols="12" md="6" class="glacial white-copy">
							<transition name="v-appear-left" appear>
								<div>
									<p>I’m a marketing consultant specializing in storytelling, general copywriting, graphic design, personal branding, and social media. My writing and design work both revolve around two key philosophies; less is more, and results. I believe in graphics that feel like a space you’d want to inhabit and stories that funnel your audience straight to your intended conversion, be it a call for a job interview, boosting social media engagement, or signing up new readers for your business’s newsletter.</p>
								</div>
							</transition>
							<transition name="v-appear-left-delay" appear>
								<div>
									<p>Prior to opening Ren & Rain Marketing, I worked in several industries, most recently in various design and communications roles in the nonprofit sector. Prior to shifting my focus solely to marketing, I received my Masters in Education Policy from the University of Washington in Seattle and my Bachelors of Biology from the Middle Tennessee State University. I currently reside in the United Kingdom with my husband and our two cats, Mrs. Reed and Count Fosco. In my spare time I enjoy traveling to new and interesting places and writing Young Adult fiction.</p>
								</div>
							</transition>
						</v-col>
						<v-col cols="12" md="6">
							<transition name="v-appear-right" appear>
								<v-img :src="require('@/assets/images/about.jpg')" />
							</transition>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-container>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../scss/globals.scss";

.white-copy {
	color: $default-text-colour;
}
</style>
