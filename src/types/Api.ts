export type Studyset = {
	id: number;
	name: string;
	description: string;
	phraseLanguage: string;
	definitionLanguage: string;
};

export type StudysetAuthor = {
	id: string;
	username: string;
	imageUrl: string;
};

export type StaredStudyset = StudysetAuthor & Studyset;
