# Base class for table
from app import mysql_api
from blockchain import Block, Blockchain
import json


def isnewtable(name):
    cur = mysql_api.connection.cursor()

    try:
        result = cur.execute(f"SELECT * from {name}")
        cur.close()
    except:
        return True
    else:
        return False


class Table:
    def __init__(self, table_name, *args):
        self.table = table_name
        self.columns = f"{','.join(args)}"
        self.columnList = args

    # Base class for table
    def getall(self):
        cur = mysql_api.connection.cursor()
        result = cur.execute(f"SELECT * FROM {self.table}")
        data = cur.fetchall()
        return data

    # Base class for table
    def getone(self, search, value):
        data = {}
        cur = mysql_api.connection.cursor()
        result = cur.execute(f"SELECT * FROM {self.table} WHERE {search} = \"{value}\"")

        if result > 0:
            data = cur.fetchone()

        cur.close()
        return data

    # Delete function for table
    def deleteone(self, search, value):
        cur = mysql_api.connection.cursor()
        cur.execute(f"DELETE from {self.table} where {search} = \"{value}\"")
        mysql_api.connection.commit()
        cur.close()

    # Delete all
    def deleteall(self):
        cur = mysql_api.connection.cursor()
        cur.execute(f"TRUNCATE TABLE {self.table}")
        mysql_api.connection.commit()
        cur.close()

    # Drop function for table
    def drop(self):
        cur = mysql_api.connection.cursor()
        cur.execute(f"DROP TABLE {self.table}")
        cur.close()

    # Insert function for table
    def insert(self, *args):
        data = ""
        for arg in args:
            data += f'\"{arg}\",'

        cur = mysql_api.connection.cursor()
        cur.execute(f"INSERT INTO `smarthack`.`{self.table}` ({self.columns}) VALUES({data[:len(data) - 1]})")
        mysql_api.connection.commit()
        cur.close()


# Function to convert to sql raw command
def sql_raw(execution):
    cur = mysql_api.connection.cursor()
    cur.execute(execution)
    mysql_api.connection.commit()
    cur.close()


# Function to get blockchain
def get_blockchain():
    blockchain = Blockchain()
    blockchain_sql = Table("blockchain", 'number', 'hash', 'previous', 'data', 'nonce')

    for b in blockchain_sql.getall():
        blockchain.add(Block(number=int(b.get('number')), previous=b.get('previous'), data=b.get('data'), nonce=b.get('nonce')))

    return blockchain


# Function to sync blockchain to mysql
def sync_blockchain(blockchain):
    blockchain_sql = Table("blockchain", 'number', 'hash', 'previous', 'data', 'nonce')
    blockchain_sql.deleteall()

    for b in blockchain.chain:
        blockchain_sql.insert(str(b.number), b.hash(), b.previous_hash, b.data, b.nonce)


def submit_flow_data(flow_id, instance_id, flow_hash, input_hash, flow_step_id=1):
    blockchain = get_blockchain()
    number = len(blockchain.chain) + 1
    data = {
        "flow_id": flow_id,
        "instance_id": instance_id,
        "flow_step_id": flow_step_id,
        "flow_hash": flow_hash,
        "input_hash": input_hash
    }

    blockchain.mine(Block(number=number, data=data))
    sync_blockchain(blockchain)
