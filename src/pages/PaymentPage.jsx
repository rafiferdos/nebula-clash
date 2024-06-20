import CardInputForm from '../components/CardInputForm';



const PaymentPage = () => {
    return (
        <div className='w-11/12 mx-auto max-w-7xl container space-y-7'>
            <h1 className='md:text-4xl text-2xl text-center'>Pay here</h1>
            <CardInputForm />
        </div>
    );
};

export default PaymentPage;
