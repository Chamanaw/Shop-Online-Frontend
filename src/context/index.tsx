import CartConstexProvider from "./cartContext";
import ProductContextProvider from "./productContext/intext";
import UserContextProvider from "./userContext";

interface Props {
    children: React.ReactNode
}

export default function ContextProvider ({children}:Props){
    return(
        <ProductContextProvider>
            <CartConstexProvider>
                <UserContextProvider>
                    {children}
                </UserContextProvider>
            </CartConstexProvider>
        </ProductContextProvider>
    )
}