import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faHouse, faFileInvoice, faBank, faNoteSticky, faKey } from '@fortawesome/free-solid-svg-icons';
import useStore from './components/store';

const Nav = () => {
    const {change} = useStore()
    const handleChoice =(newChoice : string) =>{
        change(newChoice)
    }
    return (
        
        <div className='flex flex-col md:w-[30vw] h-[100vh] bg-[#22282c] p-4 text-white'>
            <div className='flex items-center mb-6 text-4xl [&>*]:mx-4'>
                <FontAwesomeIcon icon={faLock} className='text-orange-500 mr-2' />
                <p className='font-semibold text-lg'>
                    <span className='text-orange-500'>Privy</span>
                    <br />
                    Manager
                </p>
            </div>
            <hr className='mb-4' />
            <div className='flex flex-col space-y-4'>
                <button className='flex items-center p-3 border-none w-full h-full bg-[#22282c] shadow hover:text-orange-500 hover:bg-[#352a1e] rounded-xl' onClick={()=>handleChoice("main")}>
                    <FontAwesomeIcon icon={faHouse} className='mr-3' />
                    <span>Main</span>
                </button>
                <button className='flex items-center p-3 bg-[#22282c]  hover:bg-[#352a1e] hover:text-orange-500 rounded-xl'  onClick={()=>handleChoice("Accounts")}>
                    <FontAwesomeIcon icon={faFileInvoice} className='mr-3' />
                    <span>Accounts</span>
                </button>
                <button className='flex items-center p-3 bg-[#22282c]  hover:bg-[#352a1e] hover:text-orange-500 rounded-xl'  onClick={()=>handleChoice("Bank")}>
                    <FontAwesomeIcon icon={faBank} className='mr-3' />
                    <span>Bank Cards</span>
                </button>
                <button className='flex items-center p-3 bg-[#22282c]  hover:bg-[#352a1e] hover:text-orange-500 rounded-xl'  onClick={()=>handleChoice("Notes")}>
                    <FontAwesomeIcon icon={faNoteSticky} className='mr-3' />
                    <span>Notes</span>
                </button>
            </div>
            <hr className='my-4' />
            <div className='flex flex-col space-y-4'>
                <button className='flex items-center p-3 bg-[#22282c]  hover:bg-[#352a1e] hover:text-orange-500 rounded-xl'  onClick={()=>handleChoice("passwordCheck")}>
                    <FontAwesomeIcon icon={faLock} className='mr-3' />
                    <span>Password Check</span>
                </button>
                <button className='flex items-center p-3 bg-[#22282c]  hover:bg-[#352a1e] hover:text-orange-500 rounded-xl'  onClick={()=>handleChoice("passwordGen")}>
                    <FontAwesomeIcon icon={faKey} className='mr-3' />
                    <span>Generate Password</span>
                </button>
            </div>
        </div>
    );
};

export default Nav;

