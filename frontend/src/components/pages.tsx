import { useEffect } from 'react';
import MainPage from '../mainPage';
import { useStore } from './store';

const Pages = () => {
  const { choice } = useStore();

  useEffect(() => {
    if (choice === "passwordGen") {
      window.location.href = "https://password-generat0.netlify.app";
    }
  }, [choice]);

  return (
    <div className="w-full h-full">
      {
        choice === "main" ? <MainPage /> :
        choice === "Accounts" ? <div className='flex justify-center items-center'>No Accounts Page</div> :
        choice === "Bank" ? <div className='flex justify-center items-center'>No Bank Page</div> :
        choice === "Notes" ? <div className='flex justify-center items-center'>No Notes Page</div> :
        choice === "passwordCheck" ? <div className='flex justify-center items-center'>No Password Check Page</div> :
        null
      }
    </div>
  );
};

export default Pages;
