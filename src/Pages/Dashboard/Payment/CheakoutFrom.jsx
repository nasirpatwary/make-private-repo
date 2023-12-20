import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import UseAxiosSecret from "../../../Hooks/UseAxiosSecret";
import { useEffect } from "react";
import UseCart from "../../../Hooks/UseCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheakoutFrom = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClienSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecret = UseAxiosSecret()
    const { user } = useAuth()
    const [cart, refetch] = UseCart()
    const navigat = useNavigate()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecret.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClienSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecret, totalPrice])

    const handlePayment = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[payment error]', error);
            setError(error.message)
        } else {
            console.log('[Payment Method]', paymentMethod);
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                // now save the payment in the database 
                const payment = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    price: totalPrice,
                    date: new Date(), // utc date convert. use moment js to
                    cardIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecret.post('/payments', payment)
                console.log("payment saved", res.data);
                refetch()
                if (res.data.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigat('/dashboard/paymentHistory')
                }
            }
        }
    }
    return (
        <form onSubmit={handlePayment}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-secondary my-4" type="submit" disabled={!stripe || clientSecret}>
                Pay
            </button>
            <p className="text-red 500">{error}</p>
            {transactionId && <p className="text-green-500">Your transaction id:{transactionId} </p>}
        </form>
    );
};

export default CheakoutFrom;