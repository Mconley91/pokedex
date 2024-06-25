const inputElement = document.getElementById("search-input");
const searchButtonElement = document.getElementById("search-button");
const nameElement = document.getElementById("pokemon-name");
const idElement = document.getElementById("pokemon-id");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const typesElement = document.getElementById("types");
const type1Element = document.getElementById("type1");
const type2Element = document.getElementById("type2");
const hpElement = document.getElementById("hp");
const attackElement = document.getElementById("attack");
const defenseElement = document.getElementById("defense");
const specialAttackElement = document.getElementById("special-attack");
const specialDefenseElement = document.getElementById("special-defense");
const speedElement = document.getElementById("speed");
const picture = document.getElementById("sprite");

inputElement.addEventListener("keypress", (event)=>{
  if(event.key === "Enter"){
    search()
  };
});
searchButtonElement.addEventListener("click", ()=> search());

const search = async function() {
  nameElement.innerText = "";
  idElement.innerText = "";
  weightElement.innerText = ""; 
  heightElement.innerText = "";
  type1Element.innerText = "";
  type2Element.innerText = "";
  hpElement.innerText = "";
  attackElement.innerText = "";
  defenseElement.innerText = "";
  specialAttackElement.innerText = "";
  specialDefenseElement.innerText = "";
  speedElement.innerText = "";
  picture.src = "";
  const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
  const data = await response.json();
  const foundPokemon = data.results.find((i)=>i.name === inputElement.value.toLowerCase() || i.id === Number(inputElement.value));
  if (foundPokemon){
    nameElement.innerText = foundPokemon.name.charAt(0).toUpperCase()+ foundPokemon.name.slice(1);
    idElement.innerText = foundPokemon.id;
    const response2 = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${foundPokemon.name}`);
    const data2 = await response2.json();
    weightElement.innerText = data2.weight; 
    heightElement.innerText = data2.height;
    type1Element.innerText = data2.types[0].type.name.toUpperCase();
    if(data2.types[1]){
      type2Element.innerText = data2.types[1].type.name.toUpperCase();
    };
    hpElement.innerText = data2.stats[0].base_stat;
    attackElement.innerText = data2.stats[1].base_stat;
    defenseElement.innerText = data2.stats[2].base_stat;
    specialAttackElement.innerText = data2.stats[3].base_stat;
    specialDefenseElement.innerText = data2.stats[4].base_stat;
    speedElement.innerText = data2.stats[5].base_stat;
    picture.src = data2.sprites.front_default;
  }
  else {
    alert("Pokémon not found")
  };
  };