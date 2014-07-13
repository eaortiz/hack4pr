import csv, jsonpickle, os, re
from data import AdmittedStudent

# Campuses with different spellings
campuses = {'RIOPIEDRAS' : 'SAN JUAN', 'RUM' : 'MAYAGUEZ'}

# Dictionary for latitude & longitude
pueblos = {}

# Open CSV for input
with open('university_data.csv', 'rb') as f:
	admitted_students = []
	ctr = 0
	reader = csv.reader(f)
	# Skip header row
	next(reader)

	# Read rows in csv
	for row in reader:
		ctr += 1

		campus = row[3]
		home_match = re.search('(\w+\s?\w*)\,\s+PR\s+\((\-?\d+\.\d*)\,\s+(\-\d+\.\d*)\)', row[7])

		if home_match and home_match.group(1) and (home_match.group(2)[:2] == '17' or home_match.group(2)[:2] == '18') and (home_match.group(3)[:3] == '-65' or home_match.group(3)[:3] == '-66' or home_match.group(3)[:3] == '-67'):
			home = {'pueblo' : home_match.group(1), 'latitude' : home_match.group(2), 'longitude' : home_match.group(3)}

			if not home['pueblo'] in pueblos.keys():
				pueblos[home['pueblo']] = [home['latitude'], home['longitude']]

			admitted_students.append(AdmittedStudent(ctr, row[1], row[5], home, campus, row[4], row[6]))

	# Change campus obj
	for student in admitted_students:
		if student.campus in pueblos:
			student.campus = {'campus' : student.campus, 'latitude' : pueblos[student.campus][0], 'longitude' : pueblos[student.campus][1]}
		elif campuses[student.campus] in pueblos:
			student.campus = {'campus' : campuses[student.campus], 'latitude' : pueblos[campuses[student.campus]][0], 'longitude' : pueblos[campuses[student.campus]][1]}

	json_out = jsonpickle.encode(admitted_students)

	out = open('admitted_students.json', 'w')
	out.write(json_out)
	out.close()

