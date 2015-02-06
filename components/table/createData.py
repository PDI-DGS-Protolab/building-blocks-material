#!/usr/bin/env python3

import sys
import json
import random
try:
	from faker import Factory
except:
	print("Need faker module")
	exit(1)

DATA = []

fake = Factory.create('es_ES')

if len(sys.argv) != 2:
	print("Need how many data you want")
	exit(1)

N = int(sys.argv[1])

Ids = list(range(N))

for _ in range(N):
	DATA.append({'First name':fake.first_name(), 'Last Name':fake.last_name(), 'ID':Ids.pop(random.randint(0,len(Ids)-1)), 'Job':fake.job(), 'Password':fake.password(length=10, digits=True, upper_case=True, lower_case=True), 
		'Credit Card':fake.credit_card_number(card_type='mastercard', validate=True, max_check=10)[:-2], 'Company': fake.company(), 'City':fake.city()})

print(json.dumps(DATA))