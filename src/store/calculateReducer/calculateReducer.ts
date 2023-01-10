import { CalculateReducerProps } from '@store/types';

/*
 * Типы экшенов
 */
const [SET_FILTER] = ['SET_FILTER'];
const [SET_AVAILABLE] = ['SET_AVAILABLE'];
const [SET_SUMMA] = ['SET_SUMMA'];
const [SET_COUNT] = ['SET_COUNT'];
const [SET_PRODUCTS] = ['SET_PRODUCTS'];
const [ADD_TO_BASKET_PRODUCTS] = ['ADD_TO_BASKET_PRODUCTS'];
const [DECREMENT_COUNT_PRODUCTS] = ['DECREMENT_COUNT_PRODUCTS'];
const [REMOVE_FROM_BASKET_PRODUCT] = ['REMOVE_FROM_BASKET_PRODUCT'];
const [SET_AMOUNT_PRODUCT] = ['SET_AMOUNT_PRODUCT'];

const defaultState: CalculateReducerProps = {
    filter: 'id',
    available: false,
    summa: 0,
    count: 0,
    page: 1,
    products: [],
    basket: []
};

/*
 * Генераторы экшенов (Action Creators)
 */
const setFilter = (type) => ({ type: SET_FILTER, payload: type });
const setAvailable = (value) => ({ type: SET_AVAILABLE, payload: value });
const setSumma = (summa) => ({ type: SET_SUMMA, payload: summa });
const setCount = (summa) => ({ type: SET_COUNT, payload: summa });
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const setBasketProducts = (id) => ({ type: ADD_TO_BASKET_PRODUCTS, id });
const setDecrementProduct = (id) => ({ type: DECREMENT_COUNT_PRODUCTS, id });
const removeBasketProduct = (id) => ({ type: REMOVE_FROM_BASKET_PRODUCT, id });
const setAmountProduct = (id) => ({ type: SET_AMOUNT_PRODUCT, id });

const calculateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_FILTER:
            return {
                ...state,
                products: [
                    ...state.products.sort((a, b) => {
                        if (action.payload === 'id') {
                            return a['id'] - b['id'];
                        } else if (action.payload === 'price') {
                            return a['price'] - b['price'];
                        }
                    })
                ],
                filter: action.payload
            };

        case SET_AVAILABLE:
            return {
                ...state,
                available: action.payload
            };

        case SET_SUMMA:
            return {
                ...state,
                summa: state.basket.reduce(
                    (prev, current) => prev + current.price * current.count,
                    0
                )
            };

        case SET_COUNT:
            return {
                ...state,
                count: action.payload
            };

        case SET_PRODUCTS:
            return {
                ...state,
                products: [...state.products, ...action.products]
            };

        case ADD_TO_BASKET_PRODUCTS: {
            const findInBasket =
                state.basket.findIndex((product) => product.id === action.id) !== -1;

            return {
                ...state,
                basket: [
                    ...(findInBasket
                        ? [
                              ...state.basket.map((product) => {
                                  if (product.id === action.id) {
                                      return {
                                          ...state.basket,
                                          ...product,
                                          count: product.count + 1
                                      };
                                  }

                                  return product;
                              })
                          ]
                        : [
                              ...state.basket,
                              ...state.products
                                  .filter((product) => product.id === action.id)
                                  .map((product) => {
                                      return {
                                          ...product,
                                          count: 1
                                      };
                                  })
                          ])
                ]
            };
        }

        case DECREMENT_COUNT_PRODUCTS:
            return {
                ...state,
                products: [
                    ...state.products.map((product) => {
                        if (product.id === action.id) {
                            return {
                                ...state.products,
                                ...product,
                                count: product.count - 1
                            };
                        }

                        return product;
                    })
                ]
            };

        case REMOVE_FROM_BASKET_PRODUCT:
            return {
                ...state,
                basket: [...state.basket.filter((product) => product.id !== action.id)]
            };

        case SET_AMOUNT_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products.map((product) => {
                        if (product.id === action.id) {
                            return {
                                ...state.products,
                                ...product,
                                count: product.amount
                            };
                        }

                        return product;
                    })
                ]
            };

        default:
            return state;
    }
};

export {
    setFilter,
    setAvailable,
    setSumma,
    setCount,
    setProducts,
    setBasketProducts,
    setDecrementProduct,
    removeBasketProduct,
    setAmountProduct
};
export default calculateReducer;
