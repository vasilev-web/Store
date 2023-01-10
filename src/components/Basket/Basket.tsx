import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import clsx from 'clsx';

import { RootState } from '@store/store';
import FormaterPrice from '@helpers/FormaterPrice';

import * as reducers from '@store/calculateReducer';

import './Basket.module.scss';

import prods from './products.json';

const Basket = () => {
    const [page, setPage] = useState<number>(1);
    const [prevItem, setPrevItem] = useState<number>(page - 1);
    const [nextItem, setNextItem] = useState<number>(page + 1);

    const countProductPage = 15;

    const filter = useSelector((state: RootState) => state.calculateReducer['filter']);
    const available = useSelector((state: RootState) => state.calculateReducer['available']);
    const products = useSelector((state: RootState) => {
        return state.calculateReducer['products'].filter(
            (product) => (available && product.available && product.count) || !available
        );
    });

    const dispatch = useDispatch();

    const productBasket = useSelector((state: RootState) => state.calculateReducer['basket']);

    const summaBasket = useSelector((state: RootState) => state.calculateReducer['summa']);

    const countProducts = useMemo(() => products.length, [products]);
    const countPages = Math.round(countProducts / countProductPage);

    const Pagination = () => (
        <>
            {countPages > 3 && page > 2 ? (
                <li
                    onClick={() => setPage(prevItem)}
                    className='products__pagination-item products__pagination-prev'
                >
                    &lt;
                </li>
            ) : (
                ''
            )}

            {page == countPages ? (
                <li
                    onClick={() => setPage(prevItem - 1)}
                    className='products__pagination-item next'
                >
                    {prevItem - 1}
                </li>
            ) : (
                ''
            )}

            {prevItem >= 1 ? (
                <li onClick={() => setPage(prevItem)} className='products__pagination-item prev'>
                    {prevItem}
                </li>
            ) : (
                ''
            )}

            {
                <li
                    onClick={() => setPage(page)}
                    className='products__pagination-item products__pagination-item-current'
                >
                    {page}
                </li>
            }

            {nextItem <= countPages ? (
                <li onClick={() => setPage(nextItem)} className='products__pagination-item next'>
                    {nextItem}
                </li>
            ) : (
                ''
            )}

            {page == 1 ? (
                <li
                    onClick={() => setPage(nextItem + 1)}
                    className='products__pagination-item next'
                >
                    {nextItem + 1}
                </li>
            ) : (
                ''
            )}

            {countPages > 4 && nextItem < countPages ? (
                <>
                    <li className='products__pagination-item products__pagination-empty'>...</li>
                    <li onClick={() => setPage(countPages)} className='products__pagination-item'>
                        {countPages}
                    </li>
                </>
            ) : (
                ''
            )}

            {countPages > 3 && nextItem <= countPages ? (
                <li
                    onClick={() => setPage(nextItem)}
                    className='products__pagination-item products__pagination-next'
                >
                    &gt;
                </li>
            ) : (
                ''
            )}
        </>
    );

    // Обработчик кнопки "Добавить в корзину"
    const handlerButton = (id) => {
        dispatch(reducers.setBasketProducts(id)); // Добавляет товар в корзину
        dispatch(reducers.setDecrementProduct(id)); // Уменьшает кол-во товара
        dispatch(reducers.setSumma(id)); // Пересчитывает сумму в корзине
    };

    // Обработчик кнопки удаления из корзины
    const handlerRemove = (id) => {
        dispatch(reducers.removeBasketProduct(id)); // Удаляет товар из корзины
        dispatch(reducers.setAmountProduct(id)); // Устанавливает кол-во товара
        dispatch(reducers.setSumma(id)); // Пересчитывает сумму в корзине
    };

    const handlerFilter = (type) => {
        setPage(1);
        dispatch(reducers.setFilter(type));
    };

    const handlerCheckbox = (e) => {
        setPage(1);
        dispatch(reducers.setAvailable(e.target.checked));
    };

    useEffect(() => {
        setPrevItem(page - 1);
        setNextItem(page + 1);
    }, [page]);

    useEffect(() => {
        dispatch(reducers.setProducts(prods));
    }, [dispatch]);

    return (
        <Container className='page'>
            <Row className='products'>
                <Col xs={8} className='products__block'>
                    <div className='products__filter'>
                        <ul className='products__filter-list'>
                            <li
                                onClick={() => handlerFilter('id')}
                                className={clsx(
                                    'products__filter-item',
                                    !filter || (filter === 'id' && 'products__filter-item--active')
                                )}
                            >
                                по умолчанию
                            </li>
                            <li
                                onClick={() => handlerFilter('price')}
                                className={clsx(
                                    'products__filter-item',
                                    filter === 'price' && 'products__filter-item--active'
                                )}
                            >
                                по цене
                            </li>
                        </ul>
                        <label className='products__filter-check'>
                            <input onChange={handlerCheckbox} type='checkbox' name='available' />в
                            наличии
                        </label>
                    </div>
                    <div className='products__list grid'>
                        {products
                            .slice(
                                page * countProductPage - countProductPage,
                                countProductPage * page
                            )
                            .map((product) => (
                                <div
                                    key={product.id}
                                    id={`product_${product.id}`}
                                    className={clsx(
                                        'products__item',
                                        (!product.available || !product.count) &&
                                            'products__item--notavailable'
                                    )}
                                >
                                    <div className='products__item-image'>
                                        <img src={product.image} alt='' />
                                    </div>
                                    <div className='products__item-body'>
                                        <div className='products__item-title'>{product.title}</div>
                                        <div className='products__item-price'>
                                            {product.price} рублей
                                        </div>
                                        <div className='products__item-description'>
                                            {product.descr}
                                        </div>
                                    </div>

                                    <div className='products__item-action'>
                                        {product.available ? (
                                            <>
                                                {product.count ? (
                                                    <>
                                                        <Button
                                                            className='products__item-button'
                                                            onClick={() =>
                                                                handlerButton(product.id)
                                                            }
                                                        >
                                                            Добавить в корзину
                                                        </Button>
                                                        <div className='products__item-cart'>
                                                            Остаток:{' '}
                                                            <span className='products__item-cart-count'>
                                                                {product.count} товаров
                                                            </span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className='products__item-action-notavailable'>
                                                        Товар закончился
                                                    </div>
                                                )}
                                                {productBasket.map((prod) => (
                                                    <div
                                                        key={prod.id}
                                                        className='products__item-cart products__item-cart--added'
                                                    >
                                                        {prod.id === product.id ? (
                                                            <>
                                                                Добавлено:{' '}
                                                                <span className='products__item-cart-count'>
                                                                    {prod.count} товаров
                                                                </span>
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <div className='products__item-action-notstock'>
                                                Товара нет за складе
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className='products__pagination'>
                        <ul className='products__pagination-list'>{<Pagination />}</ul>
                    </div>
                </Col>
                <Col xs={4} className='products__basket'>
                    <div className='products__basket-wrapper'>
                        {productBasket?.length ? (
                            <div className='products__goods'>
                                {productBasket.map((product) => (
                                    <div key={product.id} className='products__goods-item'>
                                        <div className='products__goods-image'>
                                            <img
                                                src={product.image}
                                                width='45'
                                                height='45'
                                                alt=''
                                            />
                                        </div>
                                        <div className='products__goods-title'>{product.title}</div>
                                        <div className='products__goods-amount'>
                                            <span className='products__goods-amount-number'>
                                                x{product.count}
                                            </span>
                                        </div>
                                        <div
                                            onClick={() => handlerRemove(product.id)}
                                            className='products__goods-remove'
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            ''
                        )}
                        {productBasket && productBasket.length ? (
                            <div className='products__total'>
                                <div className='products__total-title'>Итог</div>
                                <div className='products__total-price'>
                                    {FormaterPrice(summaBasket)}
                                </div>
                                <Button className='products__total-button'>Заказать</Button>
                            </div>
                        ) : (
                            <div className='products__total'>
                                <div className='products__total-title'>Корзина пуста</div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Basket;
