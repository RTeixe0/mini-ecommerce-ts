import promptSync from 'prompt-sync'
const prompt = promptSync()

interface Cupom {
    codigo: string
    tipo: 'porcentagem' | 'fixo'
    valor: number
  }
  
interface Produto {
  id: number
  nome: string
  preco: number
}

const cupons: Cupom[] = [
    { codigo: 'DESC10', tipo: 'fixo', valor: 10 },
    { codigo: 'PROMO15', tipo: 'porcentagem', valor: 15 }
  ]  

const produtos: Produto[] = [
  { id: 1, nome: 'Letra 3D A', preco: 15.00 },
  { id: 2, nome: 'Letra 3D B', preco: 17.50 },
  { id: 3, nome: 'Arabesco Floral', preco: 25.00 },
  { id: 4, nome: 'Letra com LED', preco: 35.00 }
]

let carrinho: Produto[] = []
let cupomAplicado: Cupom | null = null


function listarProdutos(): void {
  console.log('\n🛍️ Produtos disponíveis:')
  produtos.forEach(p => {
    console.log(`(${p.id}) ${p.nome} - R$ ${p.preco.toFixed(2)}`)
  })
}

function adicionarAoCarrinho(id: number): void {
  const produto = produtos.find(p => p.id === id)
  if (produto) {
    carrinho.push(produto)
    console.log(`✅ Produto "${produto.nome}" adicionado ao carrinho.`)
  } else {
    console.log('❌ Produto não encontrado.')
  }
}

function verCarrinho(): void {
    console.log('\n🛒 Seu carrinho:')
    if (carrinho.length === 0) {
      console.log('Carrinho vazio.')
      return
    }
  
    let subtotal = 0
    carrinho.forEach(p => {
      console.log(`- ${p.nome} - R$ ${p.preco.toFixed(2)}`)
      subtotal += p.preco
    })
  
    console.log(`🧾 Subtotal: R$ ${subtotal.toFixed(2)}`)
  
    if (cupomAplicado) {
      let desconto = 0
  
      if (cupomAplicado.tipo === 'fixo') {
        desconto = cupomAplicado.valor
      } else if (cupomAplicado.tipo === 'porcentagem') {
        desconto = subtotal * (cupomAplicado.valor / 100)
      }
  
      const total = subtotal - desconto
      console.log(`🎁 Desconto (${cupomAplicado.codigo}): -R$ ${desconto.toFixed(2)}`)
      console.log(`💰 Total com desconto: R$ ${total.toFixed(2)}`)
    } else {
      console.log(`💰 Total: R$ ${subtotal.toFixed(2)}`)
    }
  }
  

function removerDoCarrinho(id: number): void {
    const index = carrinho.findIndex(p => p.id === id)
  
    if (index !== -1) {
      const removido = carrinho.splice(index, 1)[0]
      console.log(`🗑️ Produto "${removido.nome}" removido do carrinho.`)
    } else {
      console.log('❌ Produto não encontrado no carrinho.')
    }
  }

  function aplicarCupom(codigo: string): void {
    const cupom = cupons.find(c => c.codigo === codigo.toUpperCase())
  
    if (!cupom) {
      console.log('❌ Cupom inválido.')
      return
    }
  
    cupomAplicado = cupom
    console.log(`🎉 Cupom "${cupom.codigo}" aplicado com sucesso!`)
  }
  
  

function menu(): void {
    while (true) {
      console.log('\n=== MINI E-COMMERCE ===')
      console.log('(1) Ver produtos')
      console.log('(2) Adicionar produto ao carrinho')
      console.log('(3) Ver carrinho')
      console.log('(4) Remover produto do carrinho')
      console.log('(5) Aplicar cupom de desconto')
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
      } else if (opcao === '5') {
        const codigo = prompt('Digite o código do cupom: ')
        aplicarCupom(codigo)
      }else if (opcao === '0') {
        console.log('🛒 Obrigado pela visita! Finalizando compra...')
        verCarrinho()
        break
      } else {
        console.log('Opção inválida.')
      }
    }
  }
  
menu()
