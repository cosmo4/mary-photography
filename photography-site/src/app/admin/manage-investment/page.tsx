"use client"

import { useState, useEffect } from "react";
import GoBack from "@/app/components/shared/GoBack";
import { fetchPrices, savePricesToFirestore } from "@/app/lib/firestore";

interface Prices {
    id: string;
    families: string;
    seniors: string;
    engagements: string;
    weddings: string;
}

const ManageInvestment = () => {
    const [prices, setPrices] = useState<Prices>({
        id: "",
        families: "",
        seniors: "",
        engagements: "",
        weddings: "",
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPrice = async () => {
            const result =  await fetchPrices();
            if (result) {
                setPrices({
                    id: result.id || "",
                    seniors: result.seniors || "",
                    families: result.families || "",
                    engagements: result.engagements || "",
                    weddings: result.weddings || "",
                });
            }
            setLoading(false);
        }

        fetchPrice();
    }, []);

    const handleInputChange = (field: keyof Prices, value: string) => {
        setPrices((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await savePricesToFirestore(
                prices.families,
                prices.seniors,
                prices.engagements,
                prices.weddings,
            );
            alert("Prices updated successfully!");
        } catch (error) {
            console.error("Error updatig prices: ", error);
            alert("Failed to update prices.");
        }
    }

    const isFormValid =
        /\$/.test(prices.seniors) &&
        /\$/.test(prices.families) &&
        /\$/.test(prices.engagements) &&
        /\$/.test(prices.weddings);

    if (loading) return <p className="text-2xl w-1/4 mx-auto my-32">Loading...</p>;

    return (
        <div className="min-h-screen w-4/5 mx-auto">
            <GoBack path="/admin"/>
            <h2 className="text-4xl w-5/6 mx-auto md:text-5xl text-gray-600">Update Prices</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 w-5/6 mx-auto text-2xl text-gray-600 mt-14">
                <div className="w-5/6 mx-auto">
                    <label htmlFor="seniors">Seniors</label>
                    <input 
                        type="text" 
                        id="seniors"
                        value={prices.seniors} 
                        required
                        pattern=".*\$.*"
                        title="The input must contain a $ symbol."
                        onChange={(e) => handleInputChange("seniors", e.target.value)}
                        className="px-4 py-3 border border-gray-400 w-full rounded-md mt-4 mb-7"
                        />
                </div>
                <div className="w-5/6 mx-auto">
                    <label htmlFor="families">Families</label>
                    <input 
                        type="text"
                        id="families"
                        value={prices.families} 
                        required
                        pattern=".*\$.*"
                        title="The input must contain a $ symbol."
                        onChange={(e) => handleInputChange("families", e.target.value)}
                        className="px-4 py-3 border border-gray-400 w-full rounded-md mt-4 mb-7" 
                    />
                </div>
                <div className="w-5/6 mx-auto">
                    <label htmlFor="engagements">Engagements / Bridals</label>
                    <input 
                        type="text" 
                        id="engagements"
                        value={prices.engagements} 
                        required
                        pattern=".*\$.*"
                        title="The input must contain a $ symbol."
                        onChange={(e) => handleInputChange("engagements", e.target.value)}
                        className="px-4 py-3 border border-gray-400 w-full rounded-md mt-4 mb-7" 
                    />
                </div>
                <div className="w-5/6 mx-auto">
                    <label htmlFor="weddings">Weddings</label>
                    <input 
                        type="text"
                        id="weddings"
                        value={prices.weddings} 
                        required
                        pattern=".*\$.*"
                        title="The input must contain a $ symbol."
                        onChange={(e) => handleInputChange("weddings", e.target.value)}
                        className="px-4 py-3 border border-gray-400 w-full rounded-md mt-4 mb-7" 
                    />
                </div>
            </div>
            <div className="text-center my-14">
                <button
                    onClick={handleSave}
                    disabled={!isFormValid}
                    className="px-6 py-3 hover:bg-oak hover:text-sugar text-2xl rounded-md text-black bg-wheat duration-300"
                >Update Investment Prices</button>
            </div>
        </div>
    )
}

export default ManageInvestment;