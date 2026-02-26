import React, {useState} from 'react';

import { tshirts as initialData} from './t-shirts';

const App = () => {
    const [inventory, setInventory] = useState(initialData);

const handleBuy = (title, buyQty) => {
        const updatedInventory = inventory.map((shirt) => {
            return shirt.title === title
                ? { ...shirt, stock: shirt.stock - buyQty }
                : shirt;
        });
        setInventory(updatedInventory);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">T-Shirts Store</h1>
            <div className="row">
                {inventory.map((shirt, index) => (
                    <Shirt key={index} shirt={shirt} onBuy={handleBuy} />
                ))}
            </div>
        </div>
    );
};

const Shirt = ({shirt, onBuy}) => {
    const [quantity, setQuantity] = useState(1);
    const {title, image, price, stock} = shirt;

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img src={`images/${image}`} className="card-img-top" alt={title} />

                <div className="card-body text-center">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-muted">${price.toFixed(2)}</p>
                    
                    <p className={`fw-bold ${stock === 0 ? 'text-danger' : 'text-success'}`}>{stock > 0 ? `Stock: ${stock}` : 'Out of Stock'}</p>

                    {stock > 0 ? (
                        <div className="buy-section">
                            <select
                                className="form-select mb-2"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            >
                                {[...Array(stock).keys()].map((n) => (
                                    <option key={n + 1} value={n + 1}>{n + 1}</option>
                                ))}
                            </select>

                            <button 
                                className="btn btn-primary w-100"
                                onClick={() => { onBuy(title, quantity); setQuantity(1); }}
                            >
                                Buy
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default App;