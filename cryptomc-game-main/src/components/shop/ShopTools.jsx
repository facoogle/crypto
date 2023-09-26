import gas from '../../images/tools/Gasolina.png';
import contract from '../../images/tools/Pergamino.png';
import motoA from '../../images/tools/MotoA.png';
import motoB from '../../images/tools/MotoB.png';
import motoC from '../../images/tools/MotoC.png';
import logo from '../../images/Navbar.png';

const items = [
    {
        name: 'McScooter Basic',
        price: 10,
        image: motoA,
        rarity: 'Basic',

    },
    {
        name: 'McScooter Advance',
        price: 17,
        image: motoB,
        rarity: 'Advance',

    },
    {
        name: 'McScooter Pro',
        price: 25,
        image: motoC,
        rarity: 'Pro',
    },
    {
        name: 'Fuel',
        price: 4,
        image: gas,
        rarity: 'Fuel',
    },
    {
        name: 'Contract',
        price: 40,
        image: contract,
        rarity: 'Contract',
    }
]


export default function ShopTools() {

    const Basic = 'linear-gradient(59deg, rgba(64,113,1,1) 0%, rgba(0,69,17,1) 100%)';
    const Advance = 'linear-gradient(59deg, rgba(140,4,75,1) 0%, rgba(78,0,41,1) 100%)';
    const Pro = 'linear-gradient(59deg, rgba(157,3,45,1) 0%, rgba(78,0,28,1) 100%)';
    const Fuel = 'linear-gradient(59deg, rgba(189,9,9,1) 0%, rgba(117,0,0,1) 100%)';
    const Contract = 'linear-gradient(59deg, rgba(189,9,9,1) 0%, rgba(117,0,0,1) 100%)';
    
    return (
        <>
            {items.map((item, index) => (
                <div className='shop-body-item' style={{
                    background: {
                        'Basic': Basic,
                        'Advance': Advance,
                        'Pro': Pro,
                        'Fuel': Fuel,
                        'Contract': Contract,
                    }[item.rarity]
                }} key={index}>
                    <div className='item-body-tittle'>
                        <p>{item.name}</p>
                    </div>
                    <div className='item-body-image'>
                        <img src={item.image} alt='burger' />
                    </div>
                    <div className='item-body-info'>
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
