import mongoose, { Schema } from 'mongoose';

const {
  Types: { ObjectId }
} = Schema;

/**
 * @type mongoose.SchemaDefinition
 */
const BudgetDefinition = {
  title: { type: String, required: true },
  budgetAmount: { type: Number, required: true }
};

export const BudgetSchema = new Schema(BudgetDefinition);
/**
 * @type mongoose.Model<mongoose.Document>
 */
export const BudgetModel = mongoose.model('Budget', BudgetSchema);
