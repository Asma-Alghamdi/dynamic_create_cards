# Normal way
def cardEntity(item) -> dict:
    return {
        "image":item["image"],
        "title":item["title"],
        "text":item["text"],
    }

def cardsEntity(entity) -> list:
    return [cardEntity(item) for item in entity]


