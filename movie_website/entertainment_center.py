"""Stores movies detail and opens them on a website."""

import media
import fresh_tomatoes

"""Creates twelve Movie objects, initialising these objects with title, storyline,
    poster image link, video trailer link, release date, director and screenwritter/s."""

fight_club = media.Movie('Fight Club', 
    '\'An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soapmaker, forming an underground fight club that evolves into something much, much more.\'',
    'https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL.jpg',
    'https://www.youtube.com/watch?v=_XgQA9Ab0Gw', 
    '1999',
    'David Fincher',
    ' Chuck Palahniuk (novel), Jim Uhls (screenplay)')

donnie_darko = media.Movie('Donnie Darko',
    '\'A troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes, after he narrowly escapes a bizarre accident.\'',
    'https://ia.media-imdb.com/images/M/MV5BZjZlZDlkYTktMmU1My00ZDBiLWFlNjEtYTBhNjVhOTM4ZjJjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    'https://www.youtube.com/watch?v=bzLn8sYeM9o', 
    '2001',
    'Richard Kelly',
    'Richard Kelly')

lock_stock_and_two_smoking_barrels = media.Movie('Lock, Stock and Two Smoking Barrels',
    '\'A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns.\'',
    'https://ia.media-imdb.com/images/M/MV5BMTAyN2JmZmEtNjAyMy00NzYwLThmY2MtYWQ3OGNhNjExMmM4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=h6hZkvrFIj0', 
    '1998',
    'Guy Ritchie',
    'Guy Ritchie')

crank = media.Movie('Crank',
    '\'Professional assassin Chev Chelios learns his rival has injected him with a poison that will kill him if his heart rate drops.\'',
    'https://ia.media-imdb.com/images/M/MV5BMjg0NjAxNDY4MV5BMl5BanBnXkFtZTcwODA5MjMzMw@@._V1_SY1000_CR0,0,670,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=8rvYrVTnSWw', 
    '2006',
    'Mark Neveldine and Brian Taylor',
    'Mark Neveldine and Brian Taylor')

twelve_monkeys = media.Movie('Twelve Monkeys',
    '\'In a future world devastated by disease, a convict is sent back in time to gather information about the man-made virus that wiped out most of the human population on the planet.\'',
    'https://ia.media-imdb.com/images/M/MV5BN2Y2OWU4MWMtNmIyMy00YzMyLWI0Y2ItMTcyZDc3MTdmZDU4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,671,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=15s4Y9ffW_o', 
    '1995',
    'Terry Gilliam',
    'Chris Marker (film La Jetee), David Webb Peoples (screenplay)')

snatch = media.Movie('Snatch',
    '\'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers, and supposedly Jewish jewelers fight to track down a priceless stolen diamond.\'',
    'https://ia.media-imdb.com/images/M/MV5BMTA2NDYxOGYtYjU1Mi00Y2QzLTgxMTQtMWI1MGI0ZGQ5MmU4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_SX684_AL_.jpg',
    'https://www.youtube.com/watch?v=ni4tEtuTccc', 
    '2000',
    'Guy Ritchie',
    'Guy Ritchie')

the_departed = media.Movie('The Departed',
    '\'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.\'',
    'https://ia.media-imdb.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg',
    'https://www.youtube.com/watch?v=SGWvwjZ0eDc', 
    '2006',
    'Martin Scorsese',
    'William Monahan')

the_usual_suspect = media.Movie('The Usual Suspects',
    '\'A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.\'',
    'https://ia.media-imdb.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YWE4NGI2ZjVmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,670,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=oiXdPolca5w', 
    '1995',
    'Bryan Singer',
    'Christopher McQuarrie')

inside_man = media.Movie('Inside Man',
    '\'A police detective, a bank robber, and a high-power broker enter high-stakes negotiations after the criminal\'s brilliant heist spirals into a hostage situation.\'',
    'https://ia.media-imdb.com/images/M/MV5BYjc4MjA2ZDgtOGY3YS00NDYzLTlmNTEtYWMxMzcwZjgzYWNjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=44v8NhVEL5A', 
    '2006',
    'Spike Lee',
    'Russell Gewirtz')

stalker = media.Movie('Stalker', 
    '\'A guide leads two men through an area known as the Zone to find a room that grants wishes.\'',
    'https://ia.media-imdb.com/images/M/MV5BMjM2YWM5NmQtZTA1Yi00OGUzLTllNTQtMDJiZTcwYTlhZjkyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,610,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=YuOnfQd-aTw',
    '1979',
    'Andrei Tarkovsky',
    'Andrei Tarkovsky')

black_swan = media.Movie('Black Swan',
    'A\' committed dancer wins the lead role in a production of Tchaikovsky\'s "Swan Lake" only to find herself struggling to maintain her sanity.\'',
    'https://ia.media-imdb.com/images/M/MV5BNzY2NzI4OTE5MF5BMl5BanBnXkFtZTcwMjMyNDY4Mw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=5jaI1XOB-bs',
    '2010',
    'Darren Aronofsky',
    'Mark Heyman, Andres Heinz, John J. McLaughlin')

shutter_island = media.Movie('Shutter Island',
    '\'In 1954, a U.S. Marshal investigates the disappearance of a murderer, who escaped from a hospital for the criminally insane.\'',
    'https://ia.media-imdb.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    'https://www.youtube.com/watch?v=YDGldPitxic',
    '2010',
    'Martin Scorsese',
    'Laeta Kalogridis (screenplay), Dennis Lehane (novel)')

""" Stores all the Movie objects in this list. """
movies = [fight_club, donnie_darko, lock_stock_and_two_smoking_barrels, crank, twelve_monkeys,  snatch, the_departed, the_usual_suspect, inside_man, stalker, black_swan, shutter_island]

""" Open the movie website in the user's browser, featuring all the movies on the list. """
fresh_tomatoes.open_movies_page(movies)
