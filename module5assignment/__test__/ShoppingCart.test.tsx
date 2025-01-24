import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import ShoppingCart from "@/pages/shoppingcart";

jest.mock('next/router', () => jest.requireActual('next-router-mock'))


describe("Shopping Cart Page", () => {

    describe("Basic rendering", () => {
        test ("renders NavBar with all elements", () => {
            render(<ShoppingCart />);

            expect(screen.getByRole("img", { name: "Shopping Bag" })).toBeInTheDocument();

            expect(screen.getByRole("heading", { name: "Shop Free" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Cart" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
        })

        test ("renders Shopping Cart component before fetch", () => {
            render(<ShoppingCart />);

            expect(screen.getByText("Total Items: 0")).toBeInTheDocument();

            expect(screen.getByText("Total Price: $0")).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Place Order" })).toBeInTheDocument();
        })
    })

    describe("Disabled States", () => {
        test("Disables Place Order when cart is empty", async() => {
            render(<ShoppingCart />);

            expect(screen.getByRole("button", { name: "Place Order" })).toBeDisabled();
        })
    })

    
})