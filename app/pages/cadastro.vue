<script setup lang="ts">
useSeoMeta({
  title: 'Cadastro · NodeVueNux',
  description: 'Formulário de cadastro de novos membros.'
})

interface Membro {
  nome: string
  email: string
  curso: string
  semestre: number | null
  interesses: string[]
  bio: string
}

const BIO_MAX = 200
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const cursos = [
  'Análise e Desenvolvimento de Sistemas',
  'Ciência da Computação',
  'Engenharia de Software',
  'Sistemas de Informação',
  'Design Digital',
  'Outro'
]
const semestres = Array.from({ length: 10 }, (_, i) => i + 1)
const opcoesInteresses = ['Front-end', 'Back-end', 'Mobile', 'UI/UX', 'DevOps', 'Dados / IA']

const vazio = (): Membro => ({
  nome: '',
  email: '',
  curso: '',
  semestre: null,
  interesses: [],
  bio: ''
})

const form = reactive<Membro>(vazio())
const tocado = reactive<Record<keyof Membro, boolean>>({
  nome: false,
  email: false,
  curso: false,
  semestre: false,
  interesses: false,
  bio: false
})
const tentouEnviar = ref(false)
const enviando = ref(false)
const sucesso = ref<string | null>(null)
const membros = ref<Membro[]>([])

const erros = computed(() => ({
  nome: !form.nome.trim()
    ? 'O nome é obrigatório.'
    : form.nome.trim().split(/\s+/).length < 2
      ? 'Informe nome e sobrenome.'
      : '',
  email: !form.email.trim()
    ? 'O e-mail é obrigatório.'
    : !EMAIL_REGEX.test(form.email.trim())
      ? 'Informe um e-mail válido (ex: nome@dominio.com).'
      : '',
  curso: !form.curso ? 'Selecione um curso.' : '',
  semestre: !form.semestre ? 'Selecione o semestre.' : '',
  interesses: form.interesses.length === 0 ? 'Escolha pelo menos um interesse.' : '',
  bio: form.bio.length > BIO_MAX ? `A bio deve ter no máximo ${BIO_MAX} caracteres.` : ''
}))

const formValido = computed(() => Object.values(erros.value).every((e) => !e))
const bioRestante = computed(() => BIO_MAX - form.bio.length)

// Mostra o erro só depois que o usuário mexeu no campo ou tentou enviar
function erro(campo: keyof Membro) {
  return tocado[campo] || tentouEnviar.value ? erros.value[campo] : ''
}

function limpar() {
  Object.assign(form, vazio())
  for (const campo of Object.keys(tocado) as (keyof Membro)[]) tocado[campo] = false
  tentouEnviar.value = false
}

async function enviar() {
  tentouEnviar.value = true
  sucesso.value = null
  if (!formValido.value) return

  enviando.value = true
  // Simula uma chamada à API
  await new Promise((resolve) => setTimeout(resolve, 600))

  const novo: Membro = { ...form, nome: form.nome.trim(), email: form.email.trim(), interesses: [...form.interesses] }
  membros.value.unshift(novo)

  console.group('%c✅ Novo membro cadastrado', 'color:#16a34a;font-weight:bold')
  console.table({ ...novo, interesses: novo.interesses.join(', ') })
  console.groupEnd()

  sucesso.value = `Cadastro de ${novo.nome.split(' ')[0]} realizado com sucesso!`
  enviando.value = false
  limpar()
  setTimeout(() => (sucesso.value = null), 5000)
}
</script>

<template>
  <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_20rem]">
    <section class="card bg-base-100 shadow-md">
      <form class="card-body gap-4" novalidate @submit.prevent="enviar">
        <div>
          <h1 class="card-title text-2xl md:text-3xl">Cadastro de novo membro</h1>
          <p class="text-base-content/70">Preencha os campos abaixo. Campos com * são obrigatórios.</p>
        </div>

        <div v-if="sucesso" role="alert" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ sucesso }} Os dados também foram exibidos no console.</span>
        </div>

        <div v-else-if="tentouEnviar && !formValido" role="alert" class="alert alert-error alert-soft">
          <span>Corrija os campos destacados antes de enviar.</span>
        </div>

        <!-- Nome -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Nome completo *</legend>
          <input
            v-model="form.nome"
            type="text"
            class="input w-full"
            :class="{ 'input-error': erro('nome'), 'input-success': tocado.nome && !erros.nome }"
            placeholder="Ex: Maria da Silva"
            autocomplete="name"
            @blur="tocado.nome = true"
          >
          <p v-if="erro('nome')" class="label text-error">{{ erro('nome') }}</p>
        </fieldset>

        <!-- E-mail -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend">E-mail *</legend>
          <input
            v-model="form.email"
            type="email"
            class="input w-full"
            :class="{ 'input-error': erro('email'), 'input-success': tocado.email && !erros.email }"
            placeholder="nome@dominio.com"
            autocomplete="email"
            @blur="tocado.email = true"
          >
          <p v-if="erro('email')" class="label text-error">{{ erro('email') }}</p>
        </fieldset>

        <div class="grid gap-4 md:grid-cols-[1fr_12rem]">
          <!-- Curso -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Curso / Área de atuação *</legend>
            <select
              v-model="form.curso"
              class="select w-full"
              :class="{ 'select-error': erro('curso') }"
              @blur="tocado.curso = true"
            >
              <option disabled value="">Selecione...</option>
              <option v-for="curso in cursos" :key="curso" :value="curso">{{ curso }}</option>
            </select>
            <p v-if="erro('curso')" class="label text-error">{{ erro('curso') }}</p>
          </fieldset>

          <!-- Semestre -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Semestre *</legend>
            <select
              v-model.number="form.semestre"
              class="select w-full"
              :class="{ 'select-error': erro('semestre') }"
              @blur="tocado.semestre = true"
            >
              <option disabled :value="null">Selecione...</option>
              <option v-for="s in semestres" :key="s" :value="s">{{ s }}º semestre</option>
            </select>
            <p v-if="erro('semestre')" class="label text-error">{{ erro('semestre') }}</p>
          </fieldset>
        </div>

        <!-- Interesses -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Interesses / Habilidades *</legend>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <label
              v-for="opcao in opcoesInteresses"
              :key="opcao"
              class="label cursor-pointer gap-2 rounded-box border border-base-300 p-3 text-base-content transition"
              :class="{ 'border-primary bg-primary/10': form.interesses.includes(opcao) }"
            >
              <input
                v-model="form.interesses"
                type="checkbox"
                class="checkbox checkbox-primary checkbox-sm"
                :value="opcao"
                @change="tocado.interesses = true"
              >
              {{ opcao }}
            </label>
          </div>
          <p v-if="erro('interesses')" class="label text-error">{{ erro('interesses') }}</p>
        </fieldset>

        <!-- Bio -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Mensagem / Bio curta</legend>
          <textarea
            v-model="form.bio"
            class="textarea h-28 w-full"
            :class="{ 'textarea-error': erros.bio }"
            :maxlength="BIO_MAX"
            placeholder="Conte um pouco sobre você..."
          />
          <p class="label justify-end" :class="bioRestante <= 20 ? 'text-warning' : ''">
            {{ form.bio.length }}/{{ BIO_MAX }} caracteres
          </p>
        </fieldset>

        <div class="card-actions justify-end pt-2">
          <button type="button" class="btn btn-ghost" :disabled="enviando" @click="limpar">Limpar</button>
          <button type="submit" class="btn btn-primary" :disabled="enviando">
            <span v-if="enviando" class="loading loading-spinner loading-sm" />
            {{ enviando ? 'Enviando...' : 'Cadastrar' }}
          </button>
        </div>
      </form>
    </section>

    <!-- Pré-visualização reativa + lista de cadastrados -->
    <aside class="flex flex-col gap-6">
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg">Pré-visualização</h2>
          <p class="font-semibold">{{ form.nome || 'Seu nome' }}</p>
          <p class="text-sm text-base-content/70">{{ form.email || 'seu@email.com' }}</p>
          <p class="text-sm">
            {{ form.curso || 'Curso' }}<span v-if="form.semestre"> · {{ form.semestre }}º sem.</span>
          </p>
          <div class="flex flex-wrap gap-1">
            <span v-for="i in form.interesses" :key="i" class="badge badge-primary badge-sm">{{ i }}</span>
          </div>
          <p v-if="form.bio" class="text-sm italic">"{{ form.bio }}"</p>
        </div>
      </div>

      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg">
            Membros cadastrados
            <span class="badge badge-neutral">{{ membros.length }}</span>
          </h2>
          <p v-if="membros.length === 0" class="text-sm text-base-content/70">Nenhum cadastro ainda.</p>
          <ul v-else class="flex flex-col gap-3">
            <li v-for="m in membros" :key="m.email + m.nome" class="rounded-box bg-base-200 p-3">
              <p class="font-semibold">{{ m.nome }}</p>
              <p class="text-xs text-base-content/70">{{ m.curso }} · {{ m.semestre }}º sem.</p>
              <div class="mt-1 flex flex-wrap gap-1">
                <span v-for="i in m.interesses" :key="i" class="badge badge-outline badge-xs">{{ i }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>
