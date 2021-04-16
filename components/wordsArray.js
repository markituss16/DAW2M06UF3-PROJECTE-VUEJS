var wordsArray= Vue.component("WordsArray",{
    name: 'WordsArray',
	props: {
		sopa: {
			type: Array,
			default: ()=>[],
		},
	},
	data: function(){
		return {
		}
	},
	methods:{
		selcell: function(cell)
		{
			this.$emit('cellSelected',cell);
		}
	},

    template: `
    <div class="animated px-1 col-12 col-md-9 col-lg-7 col-xl-5 pt-4 text-center">
	    <div class="content-lets">
		    <div v-for="(ey, eyi) in sopa" class="let-row" :style="{height: ctam }">
			    <div v-for="(ex, exi) in ey" 
				    class="let-cell" 
				    :class="ex.c" 
				    :style="{ width: ctam, height:ctam, 'background-color': (ex.s?ex.h:''), 'font-size': ftam }" 
				    :title_="'X: '+exi+' Y: '+eyi"
				    @click="selcell(ex)" >
				    {{ex.l}}
			    </div>
		    </div>
	    </div>
    </div>
    `
});

export {wordsArray}