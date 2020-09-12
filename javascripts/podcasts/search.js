
const input = document.getElementById("searchInput")
import {tags} from "../tags.js"
const url = "http://127.0.0.1:3000"
const elarray = tags.tags.slice(",")
autocomplete(input,elarray);

function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                input.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
            }
        }
        b.addEventListener("click", audiosEncontrados)
    });

    input.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) { 
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                if (x) x[currentFocus].click();
                }     
            }
    });
}
    async function audiosEncontrados(){
        const resp = await fetch(url + "/Podcasts/byTag/"+ input.value)
        const datos = await resp.json()
        console.log(datos)}
    
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
              if (elmnt != x[i] && elmnt != input) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
      
      
        }
      
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
