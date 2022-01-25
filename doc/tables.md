# MLD

List (CodeList, Title, Position)
Card (CodeCard, Title, Color, Position, CodeList)
Label (CodeLabel, Title, Color)

INCLUDES (CodeCard, CodeLabel)

# DataType PostGres

List

- CodeList: int
- Title: char
- Position: int

Card

- CodeCard: int
- Title: char
- Color: char
- Position: int
- CodeList: int

Label

- CodeLabel: int
- Title: char
- Color: char

INCLUDES

- CodeCard: int
- CodeLabel: int
