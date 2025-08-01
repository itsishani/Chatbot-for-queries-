import pandas as pd

class DataLoader:
    def __init__(self):
        self.customers = pd.read_csv('data/customer_data.csv')
        self.plans = pd.read_csv('data/plans_data.csv')
        self.history = pd.read_csv('data/customer_history.csv')

    def get_customer(self, customer_id):
        result = self.customers[self.customers['customer_id'] == customer_id]
        return result.to_dict(orient='records') if not result.empty else None

    def get_plan(self, plan_id):
        result = self.plans[self.plans['plan_id'] == plan_id]
        return result.to_dict(orient='records') if not result.empty else None

    def get_customer_history(self, customer_id):
        result = self.history[self.history['customer_id'] == customer_id]
        return result.to_dict(orient='records')

    def get_all_plans(self):
        return self.plans.to_dict(orient='records')