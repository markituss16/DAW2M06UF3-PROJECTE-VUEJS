import { Users } from "../class/user.js";

var wordSearch = Vue.component("WordSearch",{
	data: function(){
		return {
			allpalabras: [],
			enBuild: 1,
			enJuego: false,
			alfab: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			sopa: [],
			prepalabras :[], 
			palabras: [],
			tam: 15,
			tamax:8,
			username: null,
			User:Users
		}
	},
	methods:{
		finalizarJuego: function()
		{
			setTimeout(() => window.location.href = 'http://127.0.0.1:5500/inici.html', 1500);
		},
		checkForm: function () {
			if (this.username) {
				this.User=new Users(this.username);
				console.log(this.User.nom);
				return true;
			}
			return false;
		},
		buildSopa: function()
		{
			this.allpalabras = JSON.parse(localStorage.getItem('words'));
            this.enBuild = 1;
			this.prepalabras = [];
			this.palabras = [];
			let tam = this.tam;
			let validPalabras = this.allpalabras.filter(function(p){
				return (p.length < tam && p.length > Math.ceil((tam/4)-1) ? true : false);
			});
			let rdm;
			for(let i = 0; i < this.tamax ; i++)
			{
				rdm = Math.ceil(Math.random()*validPalabras.length)%validPalabras.length;
				this.prepalabras.push(validPalabras[rdm]);
				validPalabras.splice(rdm,1);
			}
			this.setPrepalabras();
			this.defaultSopa();
			this.setPalabras();
		},
		selcell: function(cell)
		{
			if(!this.sopaCompletada)
			{
				for(let r = 0; r < this.tam ; r++)
				{
					for(let c = 0; c < this.tam ; c++)
					{
						this.sopa[r][c].c['let-sel'] = 0;
						this.sopa[r][c].c['let-pos'] = 0;
					}
				}
				if(!this.selstart)
				{
					let x, y;
					let sel = cell.c['let-sel'];
					if(!sel)
					{
						for(let p = 1; p < this.tam*2; p++)
						{
							for(let i = -1; i < 2; i++ )
							{
								for(let j = -1; j < 2; j++ )
								{
									x = cell.x +(p*i);
									y = cell.y +(p*j);
									if(x>=0&&x<this.tam && y>=0&&y<this.tam) this.sopa[y][x].c['let-pos'] = 1;
								}
							}
						}
						cell.c['let-sel'] = 1;
						cell.c['let-pos'] = 0;
						this.selstartdata = cell;
						this.selenddata = {};
						this.selstart = 1; 
					}
				}else
				{
					this.selenddata = cell;
					self = this;
					let e = this.palabrasOk.find(function(op){
						return  ((op.d.a.x == self.selstartdata.x && 
								op.d.a.y == self.selstartdata.y && 
								op.d.b.x == self.selenddata.x && 
								op.d.b.y == self.selenddata.y)||
								(op.d.b.x == self.selstartdata.x && 
								op.d.b.y == self.selstartdata.y && 
								op.d.a.x == self.selenddata.x && 
								op.d.a.y == self.selenddata.y))
					});
					if(e)this.marcarPalabra(e);
					this.selstart = 0;
					this.selstartdata = {};
					this.selenddata = {};
					if(this.sopaCompletada) this.finalizarJuego();
				}
			}
		},
		marcarPalabra:function(pal)
		{
			this.User.punts+=1;
			let nx, ny;
			for(let l=0;l<pal.p.length;l++)
			{
				ny = l*pal.d.c.y+pal.d.a.y;
				nx = l*pal.d.c.x+pal.d.a.x;
				this.sopa[ny][nx].c['let-mar'] = 1;
				this.sopa[ny][nx].s = 1;
				this.sopa[ny][nx].h = pal.h;
				
			}
			pal.e = 1;
		},
		defaultSopa: function()
		{
			let p, rw, d;
			let t = this.tam;
			this.sopa = [];
			for(let r = 0; r<t; r++ )
			{
				rw = [];
				for(let c = 0; c<t; c++)
				{
					d = {
						l: '',
						x: c,
						y: r,
						n: r*t+c,
						s:0,
						c: {
							'let-sel': 0,
							'let-pos': 0,
							'let-mar': 0,
						}
					};
					rw.push(d);
				}
				this.sopa.push(rw);
			}
		},
		setPrepalabras: function()
		{
			for(let idx in this.prepalabras)
			{
				this.palabras.push({
					w: this.prepalabras[idx],
					p: this.preparePalabra(this.prepalabras[idx]),
					d:{},
					o: [],
					e: 0,
					u: 0,
				});
			}
		},
		preparePalabra: function(w)
		{
			w = w.toUpperCase()
			.replace(/??/,'A')
			.replace(/??/,'E')
			.replace(/??/,'I')
			.replace(/??/,'O')
			.replace(/??/,'U')
			.replace(/??/,'U')
			return w;
		},
		setPalabras: function()
		{
			this.palabras.sort(function(a,b){
				return b.p.length - a.p.length ;
			});
			let tx,ty,ok, cz, oid;
			for (let ip in this.palabras)
			{
				oid=0;
				for(let cy = 0; cy < this.tam; cy++)
				{
					for(let cx = 0; cx < this.tam; cx++)
					{
						for(let j = -1; j < 2; j++ )
						{
							for(let i = -1; i < 2; i++ )
							{
								ok = true;
								cz = 0;
								for(let l=0;l<this.palabras[ip].p.length;l++)
								{
									ty = (l*j)+cy;
									tx = (l*i)+cx;
									if(tx>=0&&tx<this.tam&&ty>=0&&ty<this.tam)
									{
										if(this.sopa[ty][tx].l!='' && this.sopa[ty][tx].l!= this.palabras[ip].p[l]) ok = false;
										else if (this.sopa[ty][tx].l== this.palabras[ip].p[l]) cz++;
									}else
									{
										ok = false;
									}
								}
								if(ok && (cx!=tx||cy!=ty))
								{
									oid ++;
									this.palabras[ip].o.push({
										a:{x:cx, y:cy}, 
										b:{x:tx, y:ty},
										c:{x:i, y:j},
										id:oid,
										z: cz, 
									}); 
								} 
							}
						}
					}
				}
				this.palabras[ip].o.sort((oa,ob)=> (oa.a.y*this.tam + oa.a.x) < ob.a.y*this.tam + ob.a.x ? -1:1);
				if(this.palabras[ip].o.length)
				{
					let f =[];
					let t = 5;
					if(!f.length||ip%t==0) f = this.palabras[ip].o;
					if(!f.length||ip%t==1) f = this.palabras[ip].o.filter((op)=> Math.abs(op.c.y) == 0 ?true:false);
					if(!f.length||ip%t==2) f = this.palabras[ip].o.filter((op)=> Math.abs(op.c.x) == 0 ?true:false);
					if(!f.length||ip%t==3) f = this.palabras[ip].o.filter((op)=> Math.abs(op.c.x) == Math.abs(op.c.y) ?true:false);
					if(!f.length||ip%t==4) f = this.palabras[ip].o.filter((op)=> op.z?true:false);
					if(f.length){
						let r = Math.floor( Math.random()*f.length );
						this.putPalabra(ip,f[r].id);
					}
				}
			}
			this.fillVacios();
		},
		putPalabra: function(idx,r)
		{
			let nx, ny;
			let p = this.palabras[idx].p;
			let o = this.palabras[idx].o.find( op => op.id == r );
			let i = o.a;
			let d = o.c;
			for(let l=0;l<p.length;l++)
			{
				ny = l*d.y+i.y;
				nx = l*d.x+i.x;
				this.sopa[ny][nx].l = p[l];
			}
			this.palabras[idx].d = o;
			this.palabras[idx].u = 1;
			this.palabras[idx].h = `rgb(${(Math.random()*96)+96},${(Math.random()*96)+96},${(Math.random()*96)+96})`;;
			this.palabras[idx].o = [];
		},
		fillVacios: function()
		{
			for(let y=0; y < this.tam; y++)
			{
				for(let x=0; x < this.tam; x++)
				{
					if(this.sopa[y][x].l=='') this.sopa[y][x].l = this.alfab[Math.floor(Math.random()*this.alfab.length)];
				}
			}
			this.enBuild = 0;
		}
	},
	computed:{
		sopaCompletada: function()
		{
			let ok = 1;
			for(let ip in this.palabrasOk) if(!this.palabrasOk[ip].e) ok = 0;
			return  ok;
		},
		palabrasOk: function(){
			return this.palabras.filter(function(pp){return pp.u});
		}
	},
	beforeMount(){
        axios
        .get('http://localhost:3000/recuperarParaules')
        .then(response => (
            this.info = response,
            localStorage.setItem('words',JSON.stringify(this.info.data)),
            this.buildSopa()
            ))
	},

    mounted(){},

    template: `
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 2%;">
		<p>
			<label for="username">Username</label>
			<input id="username" v-on:keyup.enter="actualizarLista" v-model="username" type="text" name="username">
		</p>
		<p>
			<input type="submit" v-on:click="checkForm" value="Enviar">
		</p>
    <span class="">
        <transition name="slide-fade" appear>
            <div style="display: inline-block;" v-if="!sopaCompletada" class="row m-0 pb-3">
                <div>
                    <WordsArray 
                        :sopa="sopa"
                        :tam="tam"
                        @cellSelected="selcell"
                    />
                </div>
                <div style="margin-top:2%;">
                    <WordList :palabras="palabrasOk"/>
                </div>
            </div>
            <div v-if="sopaCompletada" class="row m-0 pb-3 alert alert-secondary animated bounce infinite" role="alert">
                FELICITATS {{this.username}}!!!
            </div>
        </transition>
    </span>
	</p>
	<p style="color:white">  username: {{this.username}} | punts: {{User.punts}}</p>
</div>
    `
});

export {wordSearch}