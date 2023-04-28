const d = document
const $main = d.querySelector("main")
const $template= d.querySelector("#template-card").content
const $fragment = d.createDocumentFragment()
const $loader = d.querySelector(".loader")
let $next = d.querySelector("#next")
let $prev = d.querySelector("#prev")

const URL = "https://pokeapi.co/api/v2/pokemon/"




const apiPokemon = async function (url) {
 
    try {
        $loader.classList.add("active")
       
        let res = await fetch(url)
        let json = await res.json()

        //console.log(res)
        //console.log(res.status,res.statusText)
         console.log(json)
        //console.log(json.results.length)
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        for (let i = 0; i < json.results.length; i++) {
            //console.log(json.results[i].url)
            
            try {
                $loader.classList.add("active")
                let res = await fetch(json.results[i].url)
                let json2 = await res.json()
                //console.log(json2)
                if (!res.ok) throw { status: res.status, statusText: res.statusText }
                
                const clone = $template.cloneNode(true)
                clone.querySelector("h3").textContent=json2.name
                clone.querySelector("p").textContent=`Habilidade: ${json2.abilities[0].ability.name}`
                clone.querySelector("img").src= json2.sprites.other.dream_world.front_default



                $fragment.appendChild(clone)


            } catch (err) {
                console.log(err)
                let message = err.statusText || "Ocurrio un error"
                $main.innerHTML = `<p class="pError">Error ${err.status}: ${message}</p>`
            }
            finally{
                $loader.classList.remove("active")
            }

        }

        $main.appendChild($fragment)

        


    } catch (err) {
        console.log(err.status)
        let message = err.statusText || "Ocurrio un error"
        $main.innerHTML = `<p class="pError">Error ${err.status}: ${message}</p>`
    }finally{
        $loader.classList.remove("active")
    }

    
}



d.addEventListener("DOMContentLoaded", apiPokemon(URL))

