
data = []
with open("map.txt", 'r') as f:
	for row in f:
		data.append(row.strip().split(" "))

print(data)
print(len(data))
print(len(data[0]))

sdata = [str(datai) for datai in data]

with open("data.js", 'w') as f:
	f.write("let data =[\n\t{}\n];".format(",\n\t".join(sdata)))
