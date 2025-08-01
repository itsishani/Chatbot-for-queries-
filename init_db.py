import sqlite3

schema = """
CREATE TABLE IF NOT EXISTS plans_data (
    plan_id TEXT PRIMARY KEY,
    plan_name TEXT,
    price_per_month REAL,
    data_allowance_gb TEXT,
    calls_allowance_minutes TEXT,
    sms_allowance TEXT,
    group_plan TEXT,
    max_group_members INTEGER,
    special_features TEXT,
    policy_details TEXT
);

CREATE TABLE IF NOT EXISTS customer_data (
    customer_id TEXT PRIMARY KEY,
    plan_taken TEXT,
    calls_made_last_month INTEGER,
    data_used_gb_last_month REAL,
    location TEXT,
    churn_risk TEXT,
    FOREIGN KEY (plan_taken) REFERENCES plans_data(plan_id)
);

CREATE TABLE IF NOT EXISTS customer_history (
    customer_id TEXT,
    interaction_id TEXT PRIMARY KEY,
    interaction_type TEXT,
    timestamp TEXT,
    query_summary TEXT,
    resolution_summary TEXT,
    sentiment TEXT,
    proactive_suggestion_made TEXT,
    FOREIGN KEY (customer_id) REFERENCES customer_data(customer_id)
);
"""

conn = sqlite3.connect('data/telecom.db')
conn.executescript(schema)
conn.close()

print("Database and tables created successfully!")