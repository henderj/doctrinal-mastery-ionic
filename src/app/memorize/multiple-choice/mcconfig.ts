export interface MCConfig {
    choices: Choice[];
    correctIndex: number;
}

export interface Choice {
    text: string;
    state: string;
    id: number;
}