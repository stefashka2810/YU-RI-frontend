import Image from "next/image";

const AdditionalInfo = () => {
    return (
        <section className="relative w-full flex justify-end items-center ">
            <div className="relative w-[80vw] flex justify-end items-center">
                <div className="relative w-[52vw] h-[52vw]">
                    <Image
                        src="/landingImages/5.png"
                        alt="abstract shape"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="absolute top-1/2 -translate-y-1/3 translate-x-[-20vw] z-10 w-[50vw]">
                    <Image
                        src="/landingImages/Block.png"
                        alt="rectangle background"
                        width={960}
                        height={300}
                        className="w-full h-auto"
                        priority
                    />

                    <div className="absolute inset-0 flex items-start justify-start p-[5vw]">
                        <p className="text-[1vw] leading-[1.4] font-normal text-start">
                            LOREM IPSUM DOLOR SIT AMET....
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdditionalInfo;
