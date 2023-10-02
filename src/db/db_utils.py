import sqlite3
from typing import List, Tuple, Any
from settings.config import DB_NAME

class Database:
    def __init__(self, db_path):
        self.conn = sqlite3.connect(db_path)

    def open(self):
        with self.conn:
            self.conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_id TEXT,
            key INTEGER,
            value TEXT
            );
            """)
            
    def fetch_data(self, file_id: str) -> List[Tuple[Any, ...]]:
        cursor = self.conn.execute("SELECT * FROM users WHERE file_id = ?;", (file_id,))
        return cursor.fetchall()

    def close(self):
        self.conn.close()

    def insert_data(self, file_id: str, key: int, value: str) -> None:
        with self.conn:
            self.conn.execute(
                "INSERT INTO users (file_id, key, value) VALUES (?, ?, ?);", (file_id, key, value))

def get_users_by_file_id(file_id:str):
    db_users = Database(DB_NAME)
    db_users.open()
    res = db_users.fetch_data(file_id)
    db_users.close()
    result = []
    for item in res:
        result.append([item[2],item[3]])
    return result



