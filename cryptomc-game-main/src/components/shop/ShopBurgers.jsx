import common from '../../images/delivery/burgers/common.png';
import rare from '../../images/delivery/burgers/rare.png';
import legendary from '../../images/delivery/burgers/legendary.png';
import uncommon from '../../images/delivery/burgers/uncommon.png';
import logo from '../../images/Navbar.png'

const items = [
    {
        name: 'Classic Burger',
        score: 5.1,
        progressBar: 0,
        progressBarMAx: 56,
        price: 50,
        image: common,
        rarity: 'common',

    },
    {
        name: 'Triple Cheese Burger',
        score: 7.5,
        progressBar: 0,
        progressBarMAx: 56,
        price: 60,
        image: uncommon,
        rarity: 'uncommon',

    },
    {
        name: 'Mega McBurger',
        score: 11,
        progressBar: 0,
        progressBarMAx: 49,
        price: 70,
        image: rare,
        rarity: 'rare',

    },
    {
        name: 'HomeMade Burger',
        score: 30,
        progressBar: 0,
        progressBarMAx: 42,
        price: 80,
        image: legendary,
        rarity: 'legendary',

    }
]


export default function ShopBurgers() {

    const common = 'linear-gradient(59deg, rgba(73,73,73,1) 0%, rgba(37,37,37,1) 100%)'
    const uncommon = 'linear-gradient(59deg, rgba(0,7,93,1) 0%, rgba(0,4,57,1) 100%)';
    const rare = 'linear-gradient(59deg, rgba(76,1,134,1) 0%, rgba(41,0,70,1) 100%)';
    const legendary = 'linear-gradient(59deg, rgba(149,123,4,1) 0%, rgba(70,64,0,1) 100%)';

    return (
        <>
            {items.map((item, index) => (
                <div className='shop-body-item' style={{
                    background: {
                        'common': common,
                        'uncommon': uncommon,
                        'rare': rare,
                        'legendary': legendary
                    }[item.rarity]
                }} key={index}>
                    <div className='item-body-tittle'>
                        <p>{item.name}</p>
                        <div className='score-shop'>
                            <img src={logo} alt='logo' />
                            <p>{item.score}</p>
                        </div>
                    </div>
                    <div className='item-body-image'>
                        <img src={item.image} alt='burger' />
                    </div>
                    <div className='item-body-info'>
                        <p>{item.progressBar}/{item.progressBarMAx}</p>
                        <div className='progress-box'>
                            <div className='inventory-item-progressBar'>
                                <div className='inventory-item-progressBar-fill' style={{ width: `${item.progressBar / item.progressBarMAx * 100}%` }}></div>
                            </div>
                        </div>
                        <div className='item-body-footer'>
                            <div className='item-body-counter'>
                                <div className='item-body-sign'><p>-</p></div>
                                <div className='item-body-number'><p>0</p></div>
                                <div className='item-body-sign'><p>+</p></div>
                            </div>
                            <div className='item-body-price'>
                                <p>{item.price}$ CMC</p>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
