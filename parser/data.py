class AdmittedStudent:
	"""Admitted student class.

	:param int uid: unique id
	:param str gender: student gender
	:param float gpa: student gpa
	:param home: students home town and coordinates
	:type home: dict of str, with keys 'pueblo', 'lat', and 'long'
	:param campus: students campus and coordinates
	:type campus: dict of str, with keys 'campus', 'lat', and 'long'
	:param str major: student major
	:param int igs: student igs
			
	"""

	def __init__(self, uid, gender, gpa, home, campus, major, igs):
		self.id = uid
		self.gender = gender
		self.gpa = gpa
		self.home = location_home
		self.campus = campus
		self.major = major
		self.igs = igs

