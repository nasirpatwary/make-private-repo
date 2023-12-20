import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheakoutFrom from "./CheakoutFrom";
// TODO: add publishble key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="---At a Glance!---"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                   <CheakoutFrom></CheakoutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;