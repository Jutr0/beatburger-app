import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from "firebase/firestore";
import app from ".";
import { IMealMainType, IMealSize, IMealType } from "../types/addons";
import { IPrice } from "../types/orders";

const firestore = getFirestore(app);
export type IIngredient = {
	id: string;
	name: string;
	thumbnail: string;
	ingredientId?: string;
	price?: IPrice;
};
export type ISection = { id: string; name: string; title: string };
export type IApiOffert = {
	id: string;
	ingredients:
		| {
				quantity: number;
				ingredientId: string;
		  }[]
		| (IIngredient & { quantity: number })[];
	isBestseller: boolean;
	isNew: boolean;
	mainType: IMealMainType;
	name: string;
	price: IPrice | IPrice[];
	thumbnail: string;
	type: IMealType;
	size?: IMealSize;
};

const getSections = async () => {
	const sections: ISection[] | undefined = await getDocs(
		query(collection(firestore, "menu"), orderBy("order"))
	).then((sections) => {
		let data: ISection[] = [];
		sections.docs.forEach((doc) => {
			data.push({ ...(doc.data() as ISection), id: doc.id });
		});

		return data;
	});

	return sections;
};

const getIngredients = async () => {
	const ingredients: IIngredient[] | undefined = await getDocs(
		collection(firestore, "ingredients")
	).then((res) => {
		let data: IIngredient[] = [];
		res.docs.forEach((doc) => {
			data.push({ ...(doc.data() as IIngredient), id: doc.id });
		});
		return data;
	});

	return ingredients;
};

const getOfferts = async (sectionId: string) => {
	const offerts: IApiOffert[] | undefined = await getDocs(
		collection(firestore, "menu", sectionId, "offerts")
	).then(async (res) => {
		const data: IApiOffert[] =
			(await Promise.all(
				res.docs.map(async (doc) => {
					const temp = doc.data() as IApiOffert;

					const ingredients = await getIngredients().then(
						(resIngredients) => resIngredients || []
					);

					const matchedIngredients = temp.ingredients.map((ingredient) => {
						const matchedIngredient = ingredients?.find((step) => {
							return step.id === ingredient.ingredientId;
						});

						return {
							...ingredient,
							...matchedIngredient,
						} as IIngredient & { quantity: number };
					});
					return { ...temp, ingredients: matchedIngredients, id: doc.id };
				})
			)) || [];
		return data;
	});

	return offerts;
};

export { firestore, getSections, getIngredients, getOfferts };
