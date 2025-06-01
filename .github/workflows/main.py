import gspread
from oauth2client.service_account import ServiceAccountCredentials

def get_inductance_from_sheet():
    # ตั้งค่าการเข้าถึง
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)

    # เปิดชีตตาม ID
    sheet = client.open_by_key("15nJVmEYntjmux4jE37VeP_5nWJTFk2t0zzMjGzCvAzk").sheet1
    value = sheet.acell('D1016').value

    try:
        inductance = float(value) * 1e-6  # จาก μH → H
    except:
        raise ValueError(f"ไม่สามารถแปลงค่า '{value}' จาก D1016 เป็นตัวเลขได้")

    return inductance

if __name__ == "__main__":
    L = get_inductance_from_sheet()
    print(f"Inductance from Google Sheets D1016: {L:.9f} H")
