import mysql.connector
import pandas as pd
import matplotlib.pyplot as plt

# ---------- DATABASE CONNECTION ----------
conn = mysql.connector.connect(
    host="localhost",
    user="Amrutha",
    password="1221",
    database="blood_bank"
)
cursor = conn.cursor()

# ---------- FUNCTIONS ----------
def add_donor():
    did = int(input("Enter Donor ID: "))
    name = input("Enter Name: ")
    bg = input("Enter Blood Group: ")
    age = int(input("Enter Age: "))
    contact = input("Enter Contact: ")

    query = "INSERT INTO donor VALUES (%s, %s, %s, %s, %s)"
    values = (did, name, bg, age, contact)

    cursor.execute(query, values)
    conn.commit()
    print("Donor added successfully")


def view_donors():
    cursor.execute("SELECT * FROM donor")
    data = cursor.fetchall()

    print("\n--- Donor List ---")
    for row in data:
        print(row)


def update_blood_stock():
    bg = input("Enter Blood Group: ")
    units = int(input("Enter units to add/remove (+/-): "))

    query = """
        UPDATE blood_stock
        SET units_available = units_available + %s
        WHERE blood_group = %s
    """
    cursor.execute(query, (units, bg))
    conn.commit()

    print("Blood stock updated")


def check_availability():
    bg = input("Enter Blood Group: ")

    query = "SELECT units_available FROM blood_stock WHERE blood_group = %s"
    cursor.execute(query, (bg,))
    result = cursor.fetchone()

    if result:
        print(f"Units Available for {bg}: {result[0]}")
    else:
        print("Blood group not found")


def donor_analysis():
    df = pd.read_sql("SELECT blood_group FROM donor", conn)
    count = df['blood_group'].value_counts()

    count.plot(kind='bar')
    plt.title("Number of Donors per Blood Group")
    plt.xlabel("Blood Group")
    plt.ylabel("Number of Donors")
    plt.show()


# ---------- MAIN MENU ----------
while True:
    print("""
===== Blood Bank Management System =====
1. Add New Donor
2. View All Donors
3. Update Blood Stock
4. Check Blood Availability
5. Donor Blood Group Analysis
6. Exit
""")

    try:
        choice = int(input("Enter your choice: "))
    except ValueError:
        print("Please enter a valid number")
        continue

    if choice == 1:
        add_donor()
    elif choice == 2:
        view_donors()
    elif choice == 3:
        update_blood_stock()
    elif choice == 4:
        check_availability()
    elif choice == 5:
        donor_analysis()
    elif choice == 6:
        print("Thank you!")
        break
    else:
        print("Invalid choice")
