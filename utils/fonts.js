import { Caveat_Brush } from "next/font/google";
import { Inter } from "next/font/google";
import { Kaushan_Script } from "next/font/google";

const caveatBrush = Caveat_Brush({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400" });

export { caveatBrush, inter, kaushan };
