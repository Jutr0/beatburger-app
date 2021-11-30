import burgerIcon from "../icons/burger_icon.svg";
import burgerAndFriesIcon from "../icons/burgerandfries_icon.svg";
import chickenIcon from "../icons/chicken_icon.svg";

export type IIcon = React.VFC<React.SVGProps<SVGSVGElement>>;

type IMenuIcon = {
	title: string;
	icon: IIcon;
};

export const OPTIONS: IMenuIcon[] = [
	{ title: "Burgery", icon: burgerIcon },
	{ title: "Zestawy", icon: burgerAndFriesIcon },
	{ title: "Kurczaki", icon: chickenIcon },
];
