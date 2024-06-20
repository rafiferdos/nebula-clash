import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const CardInputForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardholderName, setCardholderName] = useState('');

    const [prize, setPrize] = useState(0);

    const navigate = useNavigate();

    // get url using react router dom
    const { id } = useParams()

    // get single contest data
    const getContestData = async () => { // Wrap the request in a function
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/contest-details/${id}`);
            const data = response.data;
            // ... Use the data in your component
            setPrize(data.prize);
        } catch (error) {
            console.error("Error fetching contest details:", error);
        }
    };

    getContestData();

    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Card Number:', cardNumber);
        console.log('Expiry Date:', expiryDate);
        console.log('CVC:', cvc);
        console.log('Cardholder Name:', cardholderName);

        if (cardNumber !== '4242424242424242') {
            toast.error('Invalid card number');
        } else {
            try {
                const response = await axiosSecure.put('/join-contest', { // Changed endpoint
                    contestId: id,
                    email: user.email,
                });
                console.log(response.data);
                toast.success('Payment successful');
                navigate('/dashboard/my_participated_contests');
            } catch (error) {
                console.error(error);
                toast.error('Payment failed');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto bg-base-300 shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Payment Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <p>You need to pay {prize} taka</p>
                <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="1234 1234 1234 1234"
                        required
                    />
                </div>
                <div>
                    {/* disabled input field for amount */}
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        value={prize}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="MM/YY"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                    <input
                        type="text"
                        id="cvc"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="CVC"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                    <input
                        type="text"
                        id="cardholderName"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CardInputForm;
