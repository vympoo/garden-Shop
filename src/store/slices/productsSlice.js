import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    { 
      id: 1, 
      name: 'Монстера', 
      price: 25.99, 
      description: 'Тропическое растение',
      inStock: true,
      category: 'tropical'
    },
    { 
      id: 2, 
      name: 'Фикус', 
      price: 19.99, 
      description: 'Комнатное растение',
      inStock: true,
      category: 'trees'
    },
    { 
      id: 3, 
      name: 'Кактус', 
      price: 9.99, 
      description: 'Неприхотливый суккулент',
      inStock: true,
      category: 'succulents'
    },
    { 
      id: 4, 
      name: 'Орхидея', 
      price: 34.99, 
      description: 'Элегантный цветок',
      inStock: false,
      category: 'flowering'
    },
    { 
      id: 5, 
      name: 'Сансевиерия', 
      price: 14.99, 
      description: 'Комнатное растение',
      inStock: true,
      category: 'air'
    },
    { 
      id: 6, 
      name: 'Папоротник', 
      price: 22.99, 
      description: 'Тропическое растение',
      inStock: true,
      category: 'tropical'
    },
    { 
      id: 7, 
      name: 'Алоэ Вера', 
      price: 12.99, 
      description: 'Лечебный суккулент',
      inStock: true,
      category: 'succulents'
    },
    { 
      id: 8, 
      name: 'Драцена', 
      price: 29.99, 
      description: 'Комнатное дерево',
      inStock: true,
      category: 'trees'
    },
    { 
      id: 9, 
      name: 'Герань', 
      price: 8.99, 
      description: 'Цветущее растение',
      inStock: false,
      category: 'flowering'
    },
    { 
      id: 10, 
      name: 'Хлорофитум', 
      price: 11.99, 
      description: 'Воздушное растение',
      inStock: true,
      category: 'air'
    },
    { 
      id: 11, 
      name: 'Антуриум', 
      price: 39.99, 
      description: 'Тропический цветок',
      inStock: true,
      category: 'tropical'
    },
    { 
      id: 12, 
      name: 'Тилландсия', 
      price: 16.99, 
      description: 'Воздушное растение',
      inStock: true,
      category: 'air'
    }
  ],
  loading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer