<script setup>
import { getPokemon, randomPokemon } from './api/pokeapi.js';
import { ref, onMounted } from 'vue';
import { getDebilidad } from './api/pokeapi.js';
const colormap = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878'
};
const tipoInfo = {
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '🧊',
  fighting: '🥊',
  poison: '☠️',
  ground: '🏜️',
  flying: '🕊️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '🛡️',
  fairy: '✨',
  normal: '⭐'
};

let loading = ref(true);
let pokemon = ref({});
let debilidad = ref({});

const cargarPokemonAleatorio = async () => {
  loading.value = true;
  try {
    pokemon.value = await randomPokemon();
    
    if (pokemon.value.types) {
      for (const t of pokemon.value.types) {
        const dataTipo = await getDebilidad(t.type.url);
        
        dataTipo.damage_relations.double_damage_from.forEach(d => {
          debilidadesSet.add(d.name);
        });
      }
    }
    debilidades.value = Array.from(debilidadesSet);

  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};


onMounted(async () => {
  pokemon.value = await randomPokemon();
  console.log('pokemon .value');
  loading.value = false;

});


</script>

<template>
  <div class="app-container">
    
    <header class="header">
      <img class="logo-pokemon" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Logo Pokémon" />
    </header>

    <div class="btn-container">
      <button @click="cargarPokemonAleatorio" class="btn-random"> Cambiar Pokémon</button>
    </div>
    <p v-if="loading">Cargando Datos</p>
    
    <main v-else class="pokedex-grid">
      <section class="pokemon-card" :style="{ backgroundColor: colorPrincipal }">
        <h2 class="pokemon-name">{{ pokemon?.name }}</h2>
        <img 
          class="pokemon-img" 
          :src="pokemon?.sprites?.other?.['official-artwork']?.front_default || pokemon?.sprites?.front_default" 
          :alt="pokemon?.name"
        >
        <div class="pokemon-metrics">
          <span>Altura: {{ pokemon?.height / 10 }}m</span>
          <span>Peso: {{ pokemon?.weight / 10 }}kg</span>
        </div>
      </section>
      <section class="pokemon-stats">
    <h2>Estadísticas</h2>
    <div v-for="s in pokemon?.stats" :key="s.stat.name" class="stat-row">
      <p class="stat-label">
        {{ s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1) }} : {{ s.base_stat }}/255
      </p>
      
    </div>
  </section>
 </main> 
  </div>    
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Comic Sans MS', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px 25px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.logo-pokemon {
  height: 75px;
}

.btn-container {
  text-align: center;
  margin-bottom: 10px;
}

.btn-random {
  background-color: #2b1f9b;
  color: #b61d1d;
  border: 2px solid #3b5ca8;
  padding: 6px 15px;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
}

.pokedex-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.1fr;
  gap: 40px;
  align-items: center;
}

.pokemon-card {
  border-radius: 16px;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 440px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.pokemon-metrics {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
}
.pokemon-stats {
  background: white;
  padding: 20px;
  border-radius: 15px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.pokemon-stats h2 {
  text-align: center;
  margin-bottom: 15px;
  font-size: 20px;
}

.stat-row {
  margin-bottom: 10px;
}

.stat-label {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 3px;
}

.stat-bar-bg {
  background: #e0e0e0;
  border-radius: 10px;
  height: 10px;
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
}

.stat-bar-fill {
  height: 100%;
  transition: width 0.4s ease;
}

</style>
