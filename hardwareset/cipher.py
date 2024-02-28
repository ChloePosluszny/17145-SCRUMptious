def reverse_String(String):
    reverse_String = ""
    for char in String:
        reverse_String = char + reverse_String
    return reverse_String

def shift(String,shift_amount):
    shifted_String = ""
    for char in String:
        Shifted_ascii = ord(char) + shift_amount
        if Shifted_ascii > 126  or Shifted_ascii < 34:
            diff = Shifted_ascii - 34
            Shifted_ascii = (diff % 93) + 34 #93 chars in our range
        shifted_String = shifted_String + chr(Shifted_ascii)
    return shifted_String

def encrypt(input_Text,N,D):
    shift_amount = N*D
    reverse_Text = reverse_String(input_Text)
    encrypted = shift(reverse_Text, shift_amount)
    return encrypted

def decrypt(encrypted_Text,N,D):
    shift_amount = N*D*-1
    shifted = shift(encrypted_Text, shift_amount)
    decrypted = reverse_String(shifted)
    return decrypted


# password = "ABC"
# N,D = 5,-1
# print("Your Password is:",password)
# encrypted = encrypt("ABC",N,D)
# print("Your encrypted password is:",encrypted)
# decrypted = decrypt(encrypted,N,D)
# print("Your decrypted password is:", decrypted)


