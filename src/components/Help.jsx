import { useState, useEffect } from "react";
import legal from "../data/legal.json";
import partner_onboarding from "../data/partner_onboarding.json";
import instamart_onboarding from "../data/instamart_onboarding.json";
import faqs from "../data/faqs.json";

/* eslint-disable react/no-unescaped-entities */
function Help() {
    const sideBarData = [
        {
            dataName: "partner_onboarding",
            title: "Partner Onboarding",
        },
        {
            dataName: "legal",
            title: "Legal",
        },
        {
            dataName: "faqs",
            title: "FAQs",
        },
        {
            dataName: "instamart_onboarding",
            title: "Instamart Onboarding",
        },
    ];

    const dataMap = {
        partner_onboarding,
        legal,
        faqs,
        instamart_onboarding,
    };

    const [drop, setDrop] = useState(false);
    const [select, setSelect] = useState("Partner Onboarding");
    const [jsonData, setJsonData] = useState([]);

    const toggleDrop = () => {
        setDrop((prev) => !prev);
    };

    const selectSideBar = (title) => {
        setSelect(title);
    };

    // Dynamically get the corresponding data based on the selected sidebar item
    useEffect(() => {
        const selectedData = dataMap[sideBarData.find((item) => item.title === select).dataName];
        setJsonData(selectedData?.data?.issues?.data || []);
    }, [select]);

    return (
        <>
            <div className="bg-[#38718E] w-full h-full">
                <div className="w-[80%] mx-auto mt-0 pt-3">
                    {/*==== To Help and Support Heading ==== */}
                    <div className="w-full text-center mt-3">
                        <h1 className="text-3xl font-semibold text-bold text-white">
                            Help And Support
                        </h1>
                        <h3 className="text-white mt-2">
                            Let's take a step ahead and help you better.
                        </h3>
                    </div>

                    {/* Sidebar and Content */}
                    <div className="bg-white h-full">
                        <div className="bg-white h-full w-[92%] mx-auto mt-8 py-14 flex">
                            {/* Sidebar */}
                            <div className="w-[30%] bg-[#EDF1F7] h-full py-4">
                                {sideBarData.map((value, i) => (
                                    <div
                                        key={i}
                                        onClick={() => selectSideBar(value.title)}
                                        className={`text-start ml-6 p-6 ${value.title === select
                                            ? "border-l-4 border-orange-500 bg-white"
                                            : "bg-[#EDF1F7]"
                                            }`}
                                    >
                                        <h1
                                            className={`text-sm font-medium  hover:text-black ${value.title === select
                                                ? "text-black"
                                                : "text-black/60"
                                                }`}
                                        >
                                            {value.title}
                                        </h1>
                                    </div>
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="w-[70%] bg-white h-full overflow-y-auto p-6">
                                <div className="h-screen">
                                    <h1 className="text-2xl font-semibold">{select}</h1>
                                    <div className="w-full mb-4">
                                        {jsonData.map((data, i) => (
                                            <>
                                                <div key={i} className="mt-3">
                                                    <div className="flex justify-between items-center" onClick={toggleDrop}>
                                                        <p>{data.title}</p>

                                                        <i className={`fi fi-rr-angle-${drop ? "up" : "down"} mt-1 text-l`}></i>
                                                    </div>
                                                    {drop && data.description && <h1>{data.description} rohan</h1>}


                                                </div>
                                                <hr className="mt-3" />
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Help;
