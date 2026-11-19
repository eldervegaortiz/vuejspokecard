export async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}
export async function getDebilidad(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${name}`);
  const data = await response.json();
  return data;
}
export async function randomPokemon() {
  const randomId = Math.floor(Math.random() * 500) + 1; 
  return await getPokemon(randomId);
}