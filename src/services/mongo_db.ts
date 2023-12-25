import mongoose from "mongoose";

// Person interface
interface Person {
  name: string;
  age: number;
}

// Person model
const personSchema = new mongoose.Schema<Person>({
  name: String,
  age: Number,
});

const Person = mongoose.model<Person>("Person", personSchema);
