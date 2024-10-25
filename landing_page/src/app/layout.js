import { Manrope } from "next/font/google";
import "./globals.css";
import FloatingContactButton from "@/components/FloatingContactButton/FloatingContactButton";

const manrope = Manrope({
    subsets: ["latin"],
    weights: [200, 300, 400, 500, 600, 700, 800],
    variable: "--font-manrope",
});

export const metadata = {
    title: "SINTEL",
    description: "Expertos en tokenizacion",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${manrope.variable}`}>
                {children}
                <FloatingContactButton />
            </body>
        </html>
    );
}
