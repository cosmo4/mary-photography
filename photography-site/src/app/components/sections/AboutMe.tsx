import Image from "next/image";

const AboutMe = () => {
    return (
        <div className="w-60vw mx-auto flex bg-bone p-14 mb-14">
            <div className="w-2/5 text-lg pb-10 mr-10">
                <h2 className="text-3xl">
                    NICE TO MEET YOU
                </h2>
                <br />
                <h3>
                    I&apos;m Mary, the face behind the lens of Mary Mills Photography.
                </h3>
                <br />
                <h3>
                    I am humbled and grateful to be your photographer. It means the world to me to know that you trust me with something so important as capturing your special milestone moments. I love and enjoy working with couples, families, teens, and children.
                </h3>
                <br />
                <h3>
                    In my images you can find timeless, authentic, natural, classic, meaningful, and heartfelt images that will be a treasured gift for generations.
                </h3>

            </div>
            <div className="w-1/2 relative block">
                <Image src="/photographer.png" alt="Photographer Mary Mills" fill className="object-contain"/>
            </div>
        </div>
        
    )
};

export default AboutMe;