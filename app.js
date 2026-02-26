//Manages the state of Inventory 
const App = () => { 
    const [inventory, setInventory] = React.useState(tshirts);

    //This part finds the specific shirt and reduces its stock
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
            <h1 className="text-center mb-4">T-Shirts</h1>
            <div className="row">
                {inventory.map((shirt, index) => (
                    <Shirt key={index} shirt={shirt} onBuy={handleBuy} />
                ))}
            </div>
        </div>
    );
};

//individual shirt details
const Shirt = ({shirt, onBuy}) => {
    const [quantity, setQuantity] = React.useState(1);
    const {title, image, price, stock} = shirt;

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img src={"images/" + image} className="card-img-top" alt={title} />

                <div className="card-body text-center">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-muted">${price.toFixed(2)}</p>
                    
                    <p className={stock === 0 ? "fw-bold text-danger" : "fw-bold text-success"}>
                        {stock > 0 ? "Stock: " + stock : 'Out of Stock'}
                    </p>

                    {/* only shows buy option id stock greater than 0 */}
                    {stock > 0 ? (
                        <div className="buy-section">

                            {/* quantity selection dropdown */}
                            <select
                                className="form-select mb-2"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            >
                                {[...Array(stock).keys()].map((n) => (
                                    <option key={n + 1} value={n + 1}>{n + 1}</option>
                                ))}
                            </select>

                            {/* buy button */}
                            <button 
                                className="btn btn-primary w-100"
                                onClick={() => { onBuy(title, quantity); setQuantity(1); }}
                            >
                                Buy
                            </button>
                        </div>
                    // if stock is 0, render nothing (null) for this section
                    ) : null}
                </div>
            </div>
        </div>
    );
};
