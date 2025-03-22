import promptSync from 'prompt-sync'
const prompt = promptSync()

// 1. Interface do Produto
interface Produto {
  id: number
  nome: string
  preco: number
}

// 2. Lista de produtos disponíveis (pode crescer depois!)
const produtos: Produto[] = [
  { id: 1, nome: 'Letra 3D A', preco: 15.00 },
  { id: 2, nome: 'Letra 3D B', preco: 17.50 },
  { id: 3, nome: 'Arabesco Floral', preco: 25.00 },
  { id: 4, nome: 'Letra com LED', preco: 35.00 }
]

// 3. Carrinho (produtos que o usuário vai adicionando)
let carrinho: Produto[] = []

// 4. Função para listar os produtos
function listarProdutos(): void {
  console.log('\n🛍️ Produtos disponíveis:')
  produtos.forEach(p => {
    console.log(`(${p.id}) ${p.nome} - R$ ${p.preco.toFixed(2)}`)
  })
}

// 5. Adicionar produto ao carrinho
function adicionarAoCarrinho(id: number): void {
  const produto = produtos.find(p => p.id === id)
  if (produto) {
    carrinho.push(produto)
    console.log(`✅ Produto "${produto.nome}" adicionado ao carrinho.`)
  } else {
    console.log('❌ Produto não encontrado.')
  }
}

// 6. Ver carrinho e total
function verCarrinho(): void {
  console.log('\n🛒 Seu carrinho:')
  if (carrinho.length === 0) {
    console.log('Carrinho vazio.')
    return
  }

  let total = 0
  carrinho.forEach(p => {
    console.log(`- ${p.nome} - R$ ${p.preco.toFixed(2)}`)
    total += p.preco
  })

  console.log(`💰 Total: R$ ${total.toFixed(2)}`)
}

// 7. Remover do carrinho
function removerDoCarrinho(id: number): void {
    const index = carrinho.findIndex(p => p.id === id)
  
    if (index !== -1) {
      const removido = carrinho.splice(index, 1)[0]
      console.log(`🗑️ Produto "${removido.nome}" removido do carrinho.`)
    } else {
      console.log('❌ Produto não encontrado no carrinho.')
    }
  }
  

// 8. Menu interativo
function menu(): void {
    while (true) {
      console.log('\n=== MINI E-COMMERCE ===')
      console.log('(1) Ver produtos')
      console.log('(2) Adicionar produto ao carrinho')
      console.log('(3) Ver carrinho')
      console.log('(4) Remover produto do carrinho')
      console.log('(0) Finalizar e sair')
  
      const opcao = prompt('Escolha uma opção: ')
  
      if (opcao === '1') {
        listarProdutos()
      } else if (opcao === '2') {
        const id = parseInt(prompt('Digite o ID do produto: '))
        adicionarAoCarrinho(id)
      } else if (opcao === '3') {
        verCarrinho()
      } else if (opcao === '4') {
        if (carrinho.length === 0) {
          console.log('Carrinho está vazio.')
          continue
        }
        verCarrinho()
        const id = parseInt(prompt('Digite o ID do produto que deseja remover: '))
        removerDoCarrinho(id)
      } else if (opcao === '0') {
        console.log('🛒 Obrigado pela visita! Finalizando compra...')
        verCarrinho()
        break
      } else {
        console.log('Opção inválida.')
      }
    }
  }
  
menu()
